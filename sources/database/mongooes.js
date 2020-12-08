const mongoose = require("mongoose");
var failed_connect = false;

async function conect() {//Phải sử dụng async/await nếu không bot sẽ crash khi không kết nối được database
  try {
    await mongoose.connect(require("../../config/app").db.connectionUri, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
    set_connect(false);
  } catch (error) {
    set_connect(true);
    console.log('LOI KET NOI DATABASE *mongoose.js: ' + error);//thông báo admin lỗi database
  }
}
function set_connect(check) {
  failed_connect = check;
}
function check_connect() {
  return failed_connect;
}

module.exports = {
  check_connect: check_connect,
  conect: conect,
};