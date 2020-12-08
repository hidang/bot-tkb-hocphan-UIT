const mongoose = require("mongoose");
let failed_connect = false;

async function conect() {//Phải sử dụng async/await nếu không bot sẽ crash khi không kết nối được database
  try {
    await mongoose.connect(require("../../config/app").db.connectionUri, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
    failed_connect = false;
  } catch (error) {
    failed_connect = true;
    console.log('LOI KET NOI DATABASE:' + error);//TODO: send message thông báo user lỗi database
  }
}
module.exports = {
  failed_connect,
  conect: conect,
};