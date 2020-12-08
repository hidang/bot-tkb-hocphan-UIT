const User = require("../models/_user");
const mongoose_conect = require("../../database/mongooes");
mongoose_conect.conect();

const createNew = (sender_id, cb) => {//async with Aarrow function
  try {
    User.findOne({ _id: sender_id }).exec((err, user) => {
      if (user) { 
        //console.log(user);
        return cb(null, false);//nếu đã tồn tại
      } else {
        var newUser = new User({
          _id: sender_id,
          type_typing: "khong",
          username: null,
          code_class: null
        });
        newUser.save((err, res) => {
          return cb(err, res);//thêm user thành công
        });
      }
      if (err) {
        return cb("Lỗi khi đang thực thi User.findOne() |database! *user.js: "+err, null);//send message to user
      }
      throw new Error('oops');//lỗi kết nối database nên User.findOne() không thể tồn tại->thông báo admin->user
    })
  
  }catch(error) {
    //TODO: truong hop ket noi thanh cong nhưng database server bi ngat giữa chừng
    console.log("database bảo trì :)");
  }
}
const updateCodeClass = (sender_id, cb) =>{//tra ra code err: trùng, đã thêm

}
module.exports = {
  //findOne: findOne,
  createNew: createNew,
  updateCodeClass: updateCodeClass,
};