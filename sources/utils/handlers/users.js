var mongoose = require("../../database/mongooes");
var User = require("../models/user");

// mongoose.connect(require("../../../config/app").db.connectionUri, {
//   useUnifiedTopology: true,
//   useNewUrlParser: true
// });
//mongoose.conect();

function createNew(sender_id, cb){
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
  });
}

// Expose all the api...
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