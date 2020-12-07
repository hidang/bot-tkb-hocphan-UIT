var User = require("../models/_user");
const mongoose_conect = require("../../database/mongooes");
mongoose_conect.conect();

const createNew = (sender_id, cb) => {//async with Aarrow function
  try {
    console.log("##HERE1");
    await User.findOne({ _id: sender_id }).exec((err, user) => {
      console.log("##HERE2");
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
    });
  } catch (error) {
    console.log("##HERE3");
    return cb("Lỗi kết nối đến database! *user.js: "+error, null);//send message to user
  }
}
const updateCodeClass = (sender_id, cb) =>{//tra ra code err: trùng, đã thêm

}
module.exports = {
  //findOne: findOne,
  createNew: createNew,
  updateCodeClass: updateCodeClass,
};