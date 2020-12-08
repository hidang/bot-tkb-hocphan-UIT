const User = require("../models/_user");
const mongoose_conect = require("../../database/mongooes");
mongoose_conect.conect();

const createNew = (sender_id, cb) => {//async with Aarrow function
  try {
    User.findOne({ _id: sender_id }).exec((err, user) => {
      if (user) { //nếu đã tồn tại
        //console.log(user);
        return cb(null, false);
      } else {
        var newUser = new User({
          _id: sender_id,
          type_typing: "khong",
          username: null,
          code_class: null
        });
        newUser.save((err, res) => {
          return cb(err, res);
        });
      }
      if (err) {
        return cb("Lỗi User.findOne() database! *user.js: "+err, null);//send message to user
      }
      throw new Error('oops');
    })
  
  }catch(error) {
    //TODO: truong hop ket noi thanh cong nhưng database server bi ngat giữa chừng
    console.log("thuc thi User.findOne() lỗi không mong muốn, se khong the xay ra :)");
  }
}
const updateCodeClass = (sender_id, cb) =>{//tra ra code err: trùng, đã thêm

}
module.exports = {
  //findOne: findOne,
  createNew: createNew,
  updateCodeClass: updateCodeClass,
};