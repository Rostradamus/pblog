const routes = require("express").Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");

routes.post("/", (req, res) => {
  const oUser = new User(req.body);
  oUser.save((err, target) => {
        if (err) {
          res.status(500);
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

module.exports = routes;
