// collection users
const mongoose = require('mongoose');
const mongoose_conect = require("../../database/mongooes");
mongoose_conect.conect();
const userSchema = mongoose.Schema({
  _id: String,
  type_typing: String,
  username: String,
  code_class: Array
});
module.exports = mongoose.model('users', userSchema);//nếu users không có s nó cũng tự thêm