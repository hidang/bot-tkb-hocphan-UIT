const User = require("../models/_user");
const mongoose_conect = require("../../database/mongooes");
const conect_ = mongoose_conect.conect();
if(typeof conect_ === "object"){
  console.log("1##HERE" + conect_);
};

const createNew = (sender_id, cb) => {//async with Aarrow function
  if(conect_){
    console.log(typeof conect_);
    console.log(conect_.MongoParseError);
    //return;
  };
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
      console.log("3##HERE" +error);
      return cb("Lỗi kết nối đến database! *user.js: "+error, null);//send message to user
    }
  });
}
const updateCodeClass = (sender_id, cb) =>{//tra ra code err: trùng, đã thêm

}
module.exports = {
  //findOne: findOne,
  createNew: createNew,
  updateCodeClass: updateCodeClass,
};