const routes = require("express").Router({mergeParams: true});
const mongoose = require("mongoose");
const Post = mongoose.model("Post");
const Comment = mongoose.model("Comment");

routes.post("/",
  (req, res) => {
    const { author, content } = req.body,
      post = req.params.post_id;
    const comment = new Comment({ post, author, content });
    // const comment = new Comment(Object.assign, req.body, { authorId: req.user._id });
    comment.save((err, target) => {
      if (err) return res.status(500).json(err);
      res.status(200);
      res.send(target);
    });
});

routes.get("/",
  (req, res) => {
    const order = { created_at: -1 };
    const post = req.params.post_id;
    Comment.find({ post })
      .populate({ path: "author", select: "userName-_id" })
      .sort(order)
      .exec((err, comments) => {
        if (err) return res.status(500).json(err);
        res.status(200);
        res.send(comments);
      });
});

routes.get("/:commentId",
  (req, res) => {

});

routes.delete("/:comment_id",
  (req, res) => {
    Comment.deleteOne({ _id: req.params.comment_id }, (err, oDelRes) => {
      if (err) return res.status(500).json(err);
      res.sendStatus(204);
    });
});

module.exports = routes;
