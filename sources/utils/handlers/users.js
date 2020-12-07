var User = require("../models/user");
const mongoose_conect = require("../../database/mongooes");
mongoose_conect.conect();

const createNew = (sender_id, cb) => {
  User.findOne({ _id: sender_id }).exec((err, user) => {
    try {
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
    } catch (error) {
      return cb("Lỗi kết nối đến database! *user.js: "+error, null);
    }
  });
}

module.exports = {
  //findOne: findOne,
  createNew: createNew,
};
//find 
// function findOne(sender_id, cb) {
//   User.findOne(sender_id).exec((err, user) => {
//     if (err) return cb(err, false);
//     if (user) {
//       return cb(err, user);
//     } else {
//       return cb(null, false);
//     }
//   });
// }
//add~create id