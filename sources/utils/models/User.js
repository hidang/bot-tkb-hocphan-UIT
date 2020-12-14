// collection is "users"
const mongoose = require('mongoose');
const codeClass = require('./_codeClass');
const userSchema = mongoose.Schema({
  _id: String,
  type_typing: String,
  username: String,
  code_class: [codeClass]
});
module.exports = mongoose.model('users', userSchema);//nếu users không có s nó cũng tự thêm