const AppError = require("../utils/appError");

const handleDuplicateError = (err, res) => {
  sendErrorProd(
    new AppError("Already exists", err.statusCode, err.status),
    res
  );
};

const sendErrorDev = (err, req, res) => {
  if (!req.originalUrl.startsWith("/api")) {
    return res.status(err.statusCode).render("error", {
      message: err.message,
    });
  }

  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, req, res) => {
  if (err.isOperational) {
    console.log("**********REQ***********", req);
    console.log("**********URL***********", req.originalUrl);
    if (!req.originalUrl.startsWith("/api")) {
      return res.status(err.statusCode).render("error", {
        message: err.message,
      });
    }

    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.log("**************** ERROR ****************\n", err);
    if (!req.originalUrl.startsWith("/api")) {
      return res.status(500).render("error", {
        message: "Something went really wrong.",
      });
    }

    res.status(500).json({
      status: "error",
      message: "Uh oh! Something went wrong.",
    });
  }
};

module.exports = (err, req, res, next) => {
  err.status = err.status || "error";
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === "development") sendErrorDev(err, req, res);
  else if (err.code === 11000) handleDuplicateError(err, res);
  else sendErrorProd(err, req, res);
};
