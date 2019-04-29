const mongoose = require('mongoose');
const { Schema } = mongoose;
const Comment = mongoose.model("Comment");

const PostSchema = new Schema({
    authorId: String,
    author: String,
    title: String,
    time: { type : Date, default: Date.now },
    content: String,
    attachment: String
}, { collection: 'Post' });

PostSchema.pre("remove", function(next, a,b) {
  // Comment.find({ post: this._id}).remove();
  Comment.deleteMany({ post: this._id}, next)
  // this.model('Comment').remove({ post: this._id }, next);
  // console.log(this);
  // next();
});

module.exports = mongoose.model('Post', PostSchema);
