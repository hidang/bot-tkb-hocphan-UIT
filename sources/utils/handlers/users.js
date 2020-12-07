var User = require("../models/_user");
const mongoose_conect = require("../../database/mongooes");
mongoose_conect.conect();

const createNew = (sender_id, cb) => {
  try {
    User.findOne({ _id: sender_id }).exec((err, user) => {
      if (user) { //nếu đã tồn tại
        console.log(user);
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
    });
  } catch (error) {
    return cb("Lỗi kết nối đến database! *user.js: "+error, null);
  }
}
const updateCodeClass = (sender_id, cb) =>{//tra ra code err: trùng, đã thêm

}
module.exports = {
  //findOne: findOne,
  createNew: createNew,
  updateCodeClass: updateCodeClass,
};