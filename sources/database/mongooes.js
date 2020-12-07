const mongoose = require("mongoose");
async function conect() {//Phải sử dụng async/await nếu không bot sẽ crash khi không kết nối được database
  try {
    await mongoose.connect(require("../../config/app").db.connectionUri, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
  } catch (error) {
    console.log('LOI KET NOI DATABASE:' +error);//TODO: send message thông báo user lỗi database
  }
}
module.exports = {
  conect: conect,
};