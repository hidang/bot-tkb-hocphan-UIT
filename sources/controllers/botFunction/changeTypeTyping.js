const db_user = require('../../utils/handlers/users');
module.exports.ChangeTypeTyping = (sender_psid, typing) => {
  db_user.updateCodeClass(typing, sender_psid, (err, result) =>{
    if(!err){
      //console.log(sender_psid +'- đã update thành công!' + typing);
    }
    else {
      //database lỗi->TODO:send message 
      console.log('*ChangeTypeTyping.js update thất bại: ! - '+ err);
    }
  });
}

