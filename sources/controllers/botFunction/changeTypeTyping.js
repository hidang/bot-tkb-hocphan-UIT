const db_user = require('../../utils/handlers/users');
module.exports = (sender_psid, typing) => {
  db_user.updateTypeTyping(typing, sender_psid, (err, result) =>{
    if(!err){
      //console.log(sender_psid +'- đã update thành công!' + typing);
    }
    else {
      //database lỗi->TODO:send message 
      console.log('*changeTypeTyping.js update thất bại: ! - '+ err);
    }
  });
}

