const router = require("express").Router();
const bcrypt = require("bcryptjs");
const RegistrationSchema = require("../models/RegistrationSchema");

router.post("/register", async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const isEmailExist = await RegistrationSchema.findOne({ email });

    if (isEmailExist) {
      return res.status(400).json({ message: "Email already Registered" });
    }

    // Password Hashing
    const hashPassword = await bcrypt.hash(password, 10);
    await RegistrationSchema.create({
      userName,
      email,
      password: hashPassword,
    });
    res.json(req.body);
  } catch (error) {
    res.status(404).json({ message: "Something Went Wrong" });
  }
});

module.exports = router;
