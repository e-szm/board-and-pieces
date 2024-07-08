const Player = require("../models/playerModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

async function getUsername(playerId) {
  const player = await Player.findById(playerId).select("username");
  if (!player)
    return next(
      new AppError(
        "We ran into an issue. Please try again later or contact support",
        500
      )
    );

  return player.username;
}

exports.getAccount = catchAsync(async (req, res, next) => {
  const username = await getUsername(req.user.player);

  res.status(200).render("account", {
    title: username,
    user: {
      email: req.user.email,
      username,
    },
  });
});

exports.getDashboard = catchAsync(async (req, res, next) => {
  const username = await getUsername(req.user.player);

  res.status(200).render("dashboard", {
    title: "Dashboard",
    user: {
      username,
    },
  });
});

exports.getHomepage = catchAsync(async (req, res, next) => {
  res.status(200).render("home");
});

exports.getLoginForm = catchAsync(async (req, res, next) => {
  if (res.locals.user) {
    res.redirect("/dashboard");
    return;
  }

  res.status(200).render("login", {
    title: "Login",
  });
});

exports.getSignupForm = catchAsync(async (req, res, next) => {
  if (res.locals.user) {
    res.redirect("/dashboard");
    return;
  }

  res.status(200).render("signup", {
    title: "Signup",
  });
});
