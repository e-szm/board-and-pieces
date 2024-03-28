"use strict";

const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });

const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB);

app.listen(process.env.PORT, () => {
  console.log("Server is listening...");
});
