const db_user = require('../../utils/handlers/users');

module.exports.getTypeTyping = (sender_psid, cb) =>{
  db_user.getTypeTyping(sender_psid, (err, result) =>{
    if(!err) {
      console.log(sender_psid +'- đã get thành công!' + result);
      return cb(result);
    }else {
      console.log('*getTypeTyping.js get data thất bại: ! - '+ err);
      return cb(false);
    }
  });
};