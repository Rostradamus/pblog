require("module-alias/register");
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const passport = require("passport");
const morgan = require("morgan");
const path = require("path");

const app = express();
app.use(morgan("dev"));
app.use(
  cookieSession({
    maxAge: 1 * 1 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_SESSION_KEY]
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(`${__dirname}/client/build`));
app.disable("etag");

// Use Session check middleware for authentication
const sessionPath = /\/api\/user\/session((\/)?(.*))/;
const postGETRequest = {
  method: "GET",
  path: /\api\/posts((\/)?(.*))/
};
const userRegisterPath = {
  method: "POST",
  path: /\/api\/users/
};
const whiteList = [sessionPath, userRegisterPath, postGETRequest];
const sessionChecker = require("@app/middlewares/sessionChecker");
app.use(sessionChecker(whiteList));

// Import models
const models = require("@models");

// Serve API routes
const routes = require("@routes");
app.use("/api", routes);

// Serve static routes
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"), err => {
    if (err) {
      res.status(500).send(err);
    }
  })
});

const serverPort = process.env.PBLOG_SERVER_PORT || 5000;
const server = app.listen(serverPort,
  () => console.log(`Running server at ${serverPort}`));
const dbConnector = require("@configs/dbConnector");
dbConnector(server);

module.exports = server;
