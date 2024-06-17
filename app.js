const path = require("path");

const express = require("express");
const { rateLimit } = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");

const viewRouter = require("./routes/viewRoutes");
const playerRouter = require("./routes/playerRoutes");
const matchRouter = require("./routes/matchRoutes");
const userRouter = require("./routes/userRoutes");
const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/appError");

const app = express();

// Setup pug templates
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// SECURITY

// Set rate limit
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1hr
  limit: 100,
  message: "Too many request... Please try again later",
});
app.use("/api", limiter);

// Set security headers
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        "script-src": ["'self'", "https://cdn.jsdelivr.net"],
      },
    },
  })
);

// Sanitize data after parsing
app.use(express.json({ limit: "10kb" }));
app.use(mongoSanitize());
app.use(xss());
app.use(cookieParser());

// Prevent parameter pollution
app.use(hpp());

// MIDDLEWARE
app.use((req, res, next) => {
  if (process.env.NODE_ENV === "development")
    console.log(`${req.method} ${req.url}`);
  next();
});
app.use(express.static(`${__dirname}/public`));

// API ROUTES
app.use("/api/v1/players", playerRouter);
app.use("/api/v1/matches", matchRouter);
app.use("/api/v1/users", userRouter);

// VIEW ROUTES
app.use("/", viewRouter);

// UNDEFINED ROUTES
app.use("*", (req, res, next) =>
  next(new AppError("We can't find what you're looking for.", 404))
);

// Error Handling
app.use(globalErrorHandler);

module.exports = app;
