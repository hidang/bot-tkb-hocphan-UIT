const db_user = require('../../utils/handlers/users');
module.exports = function changeTypeTyping(sender_psid, typing) {
  db_user.updateCodeClass(typing, sender_psid, (err, result) =>{
    if(!err){
      //console.log(sender_psid +'- đã update thành công!' + typing);
    }
    else {
      //database lỗi->TODO:send message 
      console.log('*changeTypeTyping.js update thất bại: ! - '+ err);
    }
  });
}

