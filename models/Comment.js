const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentSchema = new Schema({
  post: {
  	type: Schema.Types.ObjectId,
    required: true,
  	ref: "Post"
  },
  author: {
  	type: Schema.Types.ObjectId,
    required: true,
  	ref: "User"
  },
  created_at: { type : Date, default: Date.now },
  content: {type: String, required: true},
  isHidden: {type: Boolean, default: false}
}, { collection: 'Comment' });

mongoose.model('Comment', CommentSchema);
