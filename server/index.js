const express = require("express");
require("dotenv").config();
const app = express();
const ConnectDatabase = require("./ConnectDatabase");
const PORT = process.env.PORT;
const cors = require("cors");
// Routes Files
const registerationRouter = require("./routes/userRegistrationRoute");
const loginRouter = require("./routes/userLoginRoute");
const getUserHomeDetailsRouter = require("./routes/getUserHomeDetails");

//Database Connection
ConnectDatabase();

app.use(cors());

// middlewars
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use(registerationRouter);
app.use(loginRouter);
app.use(getUserHomeDetailsRouter);

app.listen(PORT, () => {
  console.log("Server Running at port ", PORT);
});
