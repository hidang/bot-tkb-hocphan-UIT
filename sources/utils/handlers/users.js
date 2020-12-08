const User = require("../models/_user");
const mongoose_conect = require("../../database/mongooes");
const conect_ = mongoose_conect.conect();
var flag = true;
conect_.then((r)=>{
  console.log("That bai ma van chay vao");
  console.log(r);
});
conect_.catch(function(error){//mongooes.js error: Promise { MongoParseError:: }
  console.log(error);
  flag = false;
});

const createNew = (sender_id, cb) => {//async with Aarrow function
  if(!flag){//chua test
    console.log("Loi database");//TODO:send message to user
    return;
  };
  User.findOne({ _id: sender_id }).exec((err, user) => {//TODO: truong hop database server bi ngat
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
      return cb("Lỗi User.findOne database! *user.js: "+error, null);//send message to user
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