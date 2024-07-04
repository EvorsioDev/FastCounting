import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { fileURLToPath } from "url";
import RedisStore from "connect-redis";
import session from "express-session";
import { createClient } from "redis";

import startpageRouter from "./routes/startpage.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const redisClient = createClient({
    url: process.env.REDIS_URL
});
redisClient.connect().catch(console.error);
const redisStore = new RedisStore({
  client: redisClient,
  prefix: "fast-counting:",
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    store: redisStore,
    resave: false,
    saveUninitialized: false,
    secret: Math.random().toString().substring(2),
  }),
);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "game")));

app.use("/", startpageRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
