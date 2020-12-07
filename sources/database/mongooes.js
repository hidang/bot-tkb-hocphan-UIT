const mongoose = require("mongoose");
async function conect() {
  try {
    await mongoose.connect(require("../../config/app").db.connectionUri, {
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