// embedded document
const mongoose = require('mongoose');
const codeClass = mongoose.Schema({
  code: String
});
module.exports = mongoose.model('codeClass', codeClass);//nếu users không có s nó cũng tự thêm