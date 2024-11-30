// Login page Router

const router = require("express").Router();
const bcrypt = require("bcryptjs");
const RegistrationSchema = require("../models/RegistrationSchema");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userDBdata = await RegistrationSchema.findOne({ email });

    // Check The user Not Found
    if (!userDBdata)
      return res.status(400).json({ message: "Email not Registered" });

    const checkPassword = await bcrypt.compare(password, userDBdata.password);
    if (!checkPassword)
      return res.status(400).json({ message: "Password doesn't matched" });
    // JWT Token
    const userToken = await jwt.sign(
      { email: userDBdata.email },
      process.env.JWT_SECRET_KEY
    );
    res
      .header("auth", userToken)
      .json({ userToken, message: userDBdata.userName });
  } catch (error) {
    res.status(404).json({ message: "Someting Went Wrong when Login" });
  }
});

module.exports = router;
