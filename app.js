const express = require("express");
const playerRouter = require("./routes/playerRoutes");
const matchRouter = require("./routes/matchRoutes");

const app = express();

// MIDDLEWARE
app.use(express.static(`${__dirname}/public`));
app.use(express.json());

// ROUTES
app.use("/api/v1/players", playerRouter);
app.use("/api/v1/match", matchRouter);

module.exports = app;
