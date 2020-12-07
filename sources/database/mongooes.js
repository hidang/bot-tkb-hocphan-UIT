const mongoose = require("mongoose");
function conect() {
  try {
    mongoose.connect(require("../../config/app").db.connectionUri, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
  } catch (error) {//TODO: send message thông báo user lỗi database
    console.log('LOI KET NOI DATABASE:' +error);
  }
}
module.exports = {
  conect: conect,
};