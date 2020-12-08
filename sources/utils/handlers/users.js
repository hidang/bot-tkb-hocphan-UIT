const User = require("../models/_user");
const mongoose_conect = require("../../database/mongooes");
mongoose_conect.conect();

const createNew = (sender_id, cb) => {//async with Aarrow function
  //console.log(mongoose_conect.check_connect());
  try {
    if (mongoose_conect.check_connect()) {
      throw new Error('*users.js Không kết nối được database-server');//go to catch()
    }
    User.findOne({ _id: sender_id }).exec((err, user) => {
      if (user) { 
        //console.log(user);
        return cb(null, null);//nếu đã tồn tại
      } else {
        var newUser = new User({
          _id: sender_id,
          type_typing: "khong",
          username: null,
          code_class: null
        });
        newUser.save((err, res) => {
          if(err) console.log("#3#");
          return cb(err, res);//thêm user thành công
        });
      }
      if (err) {
        //truong hop ket noi thanh cong nhưng database server bi ngat giữa chừng
        return cb("#H# Lỗi khi đang thực thi User.findOne() |database! *users.js: " + err, null);//send message to user
      }
    })
  }catch(error) {
    console.error(error.message);
    return cb("Lỗi không nối được đến database-server!", null);//send to mess-> user
  }
}
const updateCodeClass = (sender_id, cb) =>{//tra ra code err: trùng, đã thêm

}
module.exports = {
  //findOne: findOne,
  createNew: createNew,
  updateCodeClass: updateCodeClass,
};