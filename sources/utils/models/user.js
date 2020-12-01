// collection is "users"
const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
  _id: String,
  type_typing: String,
  username: String,
  code_class: Array
});
module.exports = mongoose.model('users', userSchema);//nếu users không có s nó cũng tự thêm