const passport = require('passport');
const mongoose = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;
require('../models/User');
const User = mongoose.model('User');

passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser((id, done) =>
  User.findById(id)
    .then(user => done(null, { _id: user._id, userName: user.userName }))
    .catch(err => done(err, null, { message: "User does NOT exist"})));

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  (email, password, done) => {
    User.findOne({ email: email }, (err, user) => {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }
      if (!user.verifyPassword(password)) { return done(null, false); }
      const { _id, userName } = user;
      return done(null, { _id, userName });
    });
  })
);

// TODO: Password Encryption is required (See bcrypt)
module.exports = app => {

  app.post('/api/user/authenticate', passport.authenticate('local'), (req, res) => {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    // res.redirect('/');
    res.send(req.user);
  });

  app.post('/api/user/register', (req, res) => {
    const oUser = new User(req.body);
    oUser.save((err, target) => {
          if (err) {
            res.status(401);
            errmsg = "You have entered an email that already exists."
            return res.send({ errmsg });
          }
          req.login(oUser, err => {
            if (err) {
              res.status(500);
              errmsg = "Oh oh, something went wrong. Please try to login again."
              return res.send({ errmsg });
            }
            res.status(200);
            res.send(target);
          });
      });
  });

  app.get('/api/user/current_user', (req ,res) => {
    if (!req.user) {
      res.status(401);
      res.redirect('/login');
    }
    res.status(200);
    res.send(req.user);
  });

  app.get('/api/user/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
  });
};