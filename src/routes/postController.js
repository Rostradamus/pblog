const routes = require("express").Router();
const mongoose = require("mongoose");
require("@models/Post");
const Post = mongoose.model("Post");
const commentController = require("@routes/posts/commentController");

routes.get("/", (req, res) => {
  const order = { time: -1 };
  Post.find({}).sort(order).exec((err, posts) => {
    if (err) {
      return res.status(500).json(err);
    };
    res.status(200);
    res.send(posts);
  });
});

routes.get("/:id", (req, res) => {
  Post.findById(req.params.id, (err, post) => {
    if (err) return res.status(500).json(err);
    const oBody = Object.assign({}, post._doc, {bIsAuthor: req.user && req.user._id && post.authorId === `${req.user._id}`});
    res.status(200);
    res.send(oBody);
  });
});

routes.post("/", (req, res) => {
    const post = new Post(Object.assign({}, req.body, { authorId: req.user._id }));
    post.save((err, target) => {
        if (err) return res.status(500).json(err);
        res.status(200);
        res.send(target);
    });
});

routes.put("/", (req, res) => {
  const oBody = req.body;
  Post.findByIdAndUpdate(oBody._id, { $set: oBody }, {}, (err, post) => {
    if (err) return res.status(500).json(err);
      res.status(200);
      res.send(post);
  });
});

routes.delete("/:id", (req, res) => {
  Post.findById(req.params.id, (err, post) => {
    post.remove()
      .then((oDelRes) => {
        res.sendStatus(204);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });
});
routes.use("/:post_id/comments", commentController);

module.exports = routes;
