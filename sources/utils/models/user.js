var mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  _id: String,
  type_typing: String,
  username: String,
  code_class: Array
});
module.exports = mongoose.model('user', userSchema);