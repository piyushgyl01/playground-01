const mongoose = require("mongoose");
require("dotenv").config();

const mongoURI = process.env.MONGODB;

const initialiseDatabase = async () => {
  await mongoose
    .connect(mongoURI)
    .then(() => {
      console.log("Connected to database");
    })
    .catch((error) =>
      console.error("Error connecting to the database.", error)
    );
};

module.exports = { initialiseDatabase };
