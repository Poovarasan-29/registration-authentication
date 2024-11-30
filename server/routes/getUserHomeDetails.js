// Get user data by logged email

const router = require("express").Router();
const RegistrationSchema = require("../models/RegistrationSchema");
const jwt = require("jsonwebtoken");

router.get("/getUserHomeDetails", async (req, res) => {
  const token = req.header("auth");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const userData = await RegistrationSchema.findOne({
      email: decoded.email,
    }).select(["-password"]);
    res.json(userData);
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired Token" });
  }
});

module.exports = router;
