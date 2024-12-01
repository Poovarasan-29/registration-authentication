const router = require("express").Router();
const nodemailer = require("nodemailer");
const RegistrationSchema = require("../models/RegistrationSchema");
const bcrypt = require("bcryptjs");

router.post("/rest-password-request", async (req, res) => {
  const { email } = req.body;

  const user = await RegistrationSchema.findOne({ email });
  if (!user)
    return res.status(403).json({ message: "User not found! Signup first" });

  const OTP = Math.floor(100000 + Math.random() * 900000).toString();

  user.resetPasswordOTP = await bcrypt.hash(OTP, 10);
  user.resetPasswordExpiry = Date.now() + 300000;
  await user.save();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "spking222005@gmail.com",
      pass: "abvoiwdtaxwadeeu",
    },
  });
  const message = {
    from: '"Poovarasan" spking222005@gmail.com',
    to: user.email,
    subject: "Password reset request",
    text: `You are receiving this email because you (or someone else) has requested a password reset for your account. \n\n Please use the folowing OTP to reset your password: ${OTP}\n\n If you didn't request a password reset, please ignore this email.`,
  };

  transporter.sendMail(message, (err, info) => {
    if (err)
      res.status(404).json({ message: "Something went wrong, Try again!" });
    res.status(200).json({ message: "OTP sent to email" });
  });
});

router.post("/reset-password-verfy-otp", async (req, res) => {
  const { email, OTP } = req.body;
  try {
    const user = await RegistrationSchema.findOne({ email });

    if (user.resetPasswordExpiry < Date.now()) {
      user.resetPasswordOTP = null;
      user.resetPasswordExpiry = null;
      await user.save();
      return res.status(403).json({ message: "OTP Expired!", expired: true });
    }
    const checkPassword = await bcrypt.compare(
      OTP.toString(),
      user.resetPasswordOTP.toString()
    );
    if (checkPassword) {
      user.resetPasswordOTP = null;
      user.resetPasswordExpiry = null;
      await user.save();
      return res.status(200).json({ message: "OTP verified successfully!" });
    }
    res.status(400).json({ message: "Invalid OTP! Please Try again" });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong! Try again" });
  }
});

router.post("/reset-password-new", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await RegistrationSchema.findOne({ email });
    const hashPassword = await bcrypt.hash(password, 10);
    user.password = hashPassword;
    await user.save();
    res.status(200).json({ message: "Password reset successful! Log in now" });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
});
module.exports = router;
