"use strict";

const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });

const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB);

const server = app.listen(process.env.PORT, () => {
  console.log("Server is listening...");
});

process.on("unhandledRejection", (err) => {
  console.log("**********UNHANDLED REJECTION**********");
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  console.log("**********SIGTERM RECEIVED**********");
  server.close(() => {
    console.log("**********PROCESS TERMINATED**********");
  });
});
