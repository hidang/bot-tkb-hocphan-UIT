const db_user = require('../../utils/handlers/users');
var _getTypeTyping = new Promise(
  function (resolve, reject) {
    db_user.getTypeTyping(sender_psid, (err, result) =>{
      if(!err) {
        console.log(sender_psid +'- đã get thành công!' + result);
        resolve(result);
      }else {
        console.log('*getTypeTyping.js get data thất bại: ! - '+ err);
        reject(false);
      }
    });
  }
);

module.exports.getTypeTyping = (sender_psid) =>{
  _getTypeTyping
    .then((result)=>{
      return result;
    })
    .catch((result)=>{
      return result;
    });
};