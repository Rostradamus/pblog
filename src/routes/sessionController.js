const routes = require("express").Router();
const passport = require("passport");
const mongoose = require("mongoose");
const LocalStrategy = require("passport-local").Strategy;
require("@models/User");
const User = mongoose.model("User");

passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser((id, done) =>
  User.findById(id)
    .then(user => done(null, user))
    .catch(err => done(err, null, { message: "User does NOT exist"})));

passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password"
  },
  (email, password, done) => {
    User.findOne({ email: email }, ["+password"], (err, user) => {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: "Incorrect email." });
      }
      user.verifyPassword(password)
        .then(valid => {
          if (!valid) return done(null, false);
          user.set("password", undefined, {strict: false});
          return done(null, user);
        })
        .catch(err => {
          return done(null, false);
        });
    });
  })
);
routes.post("/", passport.authenticate("local"), (req, res) => {
  res.send(req.user);
});

routes.get("/", (req ,res) => {
  if (!req.user) {
    res.redirect(401,"/login");
  } else {
    res.status(200);
    res.send(req.user);
  }
});

routes.delete("/", async (req, res) => {
  try {
    req.session = null;
    req.logout();
    res.sendStatus(204);
  } catch (e) {
    res.status(500);
    res.send(e);
  }
});

module.exports = routes;
