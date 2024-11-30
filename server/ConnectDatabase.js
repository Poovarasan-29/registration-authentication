const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGODB_CONNECTION_STRING;

const getDatabase = () => {
  mongoose
    .connect(MONGODB_URI)
    .then((res) => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));
};
module.exports = getDatabase;
