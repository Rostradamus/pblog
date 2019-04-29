const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    userName: String,
    email: {
      type: String,
      required: true,
      index: { unique: true }
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    token: String
}, { collection: 'User' });

UserSchema.methods.verifyPassword = async function(password) {
  return this.password === password;
}

if (process.env.NODE_ENV === "production") {
  UserSchema.plugin(require('mongoose-bcrypt'));
}

module.exports = mongoose.model('User', UserSchema);
