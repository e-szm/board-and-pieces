const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const User = require("../models/userModel");
const Player = require("../models/playerModel");
const sendEmail = require("../utils/sendEmail");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const signToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: true,
  };
  if (process.env.NODE_ENV !== "production") cookieOptions.secure = false;
  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

const verifyAsync = async (token, key) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, key, (err, decoded) =>
      err ? reject(err) : resolve(decoded)
    );
  });
};

exports.changeMyPassword = catchAsync(async function (req, res, next) {
  const user = await User.findById(req.user._id).select("password");

  if (!(await user.comparePasswords(req.body.oldPassword, user.password)))
    return next(new AppError("Incorrect old password", 401));

  user.password = req.body.newPassword;
  user.confirm_password = req.body.newPasswordConfirm;
  await user.save();

  createSendToken(user, 200, res);
});

exports.forgotMyPassword = catchAsync(async function (req, res, next) {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    res.status(200).json({
      status: "success",
      message:
        "If the email you provided is associated with an active account, a token has been sent",
    });
    return next();
  }

  const token = await user.createResetToken();
  const url = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/reset-password/${token}`;

  try {
    await sendEmail({
      email: req.body.email,
      subject: "Password Reset Token",
      body: `Please go to the following URL to reset your password:\n\n${url}\n\nThe link is valid for 10 minutes.`,
    });
  } catch (err) {
    user.reset_token = "";
    user.reset_expiration = "";
    await user.save();

    return next(
      new AppError(
        "Uh oh! There was an issue with your request. Please try again later",
        500
      )
    );
  }

  res.status(200).json({
    status: "success",
    message:
      "If the email you provided is associated with an active account, a token has been sent",
  });
});

exports.isLoggedIn = catchAsync(async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    try {
      const { id: userId, iat: issued } = await verifyAsync(
        token,
        process.env.JWT_SECRET
      );

      const user = await User.findById(userId);
      if (!user || user.passwordChangedAfter(issued)) return next();

      res.locals.user = user;
    } catch (err) {
      // Do NOT want to throw errors when checking logins
      return next();
    }
  }

  next();
});

exports.login = catchAsync(async function (req, res, next) {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError("Please provide an email and password", 400));

  const user = await User.findOne({ email }).select("password");

  if (!user || !(await user.comparePasswords(password, user.password)))
    return next(new AppError("Incorrect username or password", 400));

  createSendToken(user, 200, res);
});

exports.logout = catchAsync(async (req, res, next) => {
  const cookieOptions = {
    expires: new Date(Date.now() + 10000),
    httpOnly: true,
    secure: false,
  };

  res.cookie("jwt", "loggedout", cookieOptions);

  res.status(200).json({
    status: "success",
  });
});

exports.protectRoute = catchAsync(async function (req, res, next) {
  let token;

  if (req.cookies.jwt) token = req.cookies.jwt;
  else if (req.headers.authorization?.startsWith("Bearer"))
    token = req.headers.authorization.split(" ")[1];

  if (!token || token === "null") {
    return next(new AppError("You must login to access this page", 401));
  }

  const { id: userId, iat: issued } = await verifyAsync(
    token,
    process.env.JWT_SECRET
  );

  const user = await User.findById(userId);
  if (!user || user.passwordChangedAfter(issued))
    return next(new AppError("You must login to access this page", 401));

  req.user = user;

  next();
});

exports.resetPassword = catchAsync(async function (req, res, next) {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    reset_token: hashedToken,
    reset_expiration: { $gt: Date.now() },
  });

  if (!user) return next(new AppError("Invalid token", 400));

  user.reset_token = undefined;
  user.reset_expiration = undefined;
  user.password = req.body.password;
  user.confirm_password = req.body.confirm_password;
  await user.save();

  user.password = undefined;
  res.status(200).json({
    status: "success",
    data: user,
  });
});

exports.restrictTo =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(new AppError("You do not have access to this page", 403));

    next();
  };

exports.signup = catchAsync(async function (req, res, next) {
  const { email, password, confirm_password, username } = req.body;

  if (await User.exists({ username }))
    return next(new AppError("You already have an account. Please login"));

  const player = await Player.validateOrCreatePlayer(username);
  const newUser = await User.create({
    email,
    password,
    confirm_password,
    player: player._id,
  });

  createSendToken(newUser, 201, res);
});
