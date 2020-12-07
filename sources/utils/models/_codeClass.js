// embedded document
const mongoose = require('mongoose');
const codeClass = mongoose.Schema({
  code: String
});
module.exports = codeClass;