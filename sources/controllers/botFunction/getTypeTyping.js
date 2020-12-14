const db_user = require('../../utils/handlers/users');

module.exports.getTypeTyping = (sender_psid) =>{
  return new Promise(
    function (resolve) {
      db_user.getTypeTyping(sender_psid, (err, result) =>{
        if(!err) {
          //console.log(sender_psid +'- đã get thành công!' + result);
          resolve(result);
        }else {
          console.log('*getTypeTyping.js get data thất bại: ! - '+ err);
          resolve(false);
        }
      });
    }
  )
};