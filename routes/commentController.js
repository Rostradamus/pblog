const routes = require('express').Router({mergeParams: true});
const mongoose = require('mongoose');
const Post = mongoose.model('Post');
const Comment = mongoose.model('Comment');

const _hasLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
}
routes.post("/",
  _hasLoggedIn,
  (req, res) => {
    const { author, content } = req.body,
      post = req.params.post_id;
    const comment = new Comment({ post, author, content });
    // const comment = new Comment(Object.assign, req.body, { authorId: req.user._id });
    comment.save((err, target) => {
      if (err) res.send(err);
      res.status(200);
      res.send(target);
    });
});

routes.get("/",
  (req, res) => {
    const order = { created_at: -1 };
    const post = req.params.post_id;
    Comment.find({ post })
      .populate({ path: "author", select: "userName _id" })
      .sort(order)
      .lean()
      .exec((err, comments) => {
        if (err) res.send(err);
        const processedComments = comments.map(comment => {
          const bIsAuthor = req.user && req.user._id && comment.author._id.equals(req.user._id);
          const result = Object.assign({...comment}, { bIsAuthor });
          delete result.author._id;
          return result;
        });
        res.status(200);
        res.send(processedComments);
      });
});

routes.get("/:commentId",
  (req, res) => {

});

routes.delete("/:comment_id",
  _hasLoggedIn,
  (req, res) => {
    Comment.deleteOne({ _id: req.params.comment_id }, (err, oDelRes) => {
      if (err) res.send(err);
      res.sendStatus(204);
    });
});

module.exports = routes;
