const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentSchema = new Schema({
  post: {
  	type: Schema.Types.ObjectId,
  	ref: "Post"
  },
  author: {
  	type: Schema.Types.ObjectId,
  	ref: "User"
  },
  created_at: { type : Date, default: Date.now },
  content: {type: String, required: true},
  isHidden: {type: Boolean, default: false}
}, { collection: 'Comment' });

module.exports = mongoose.model('Comment', CommentSchema);
