const db_user = require('../../utils/handlers/users');
const sendTextMessage      = require('./sendTextMessage');
const changeTypeTyping = require('./changeTypeTyping');

const set_input_Username = (sender_psid) => {
  sendTextMessage.sendTextMessage(sender_psid, "✏ Nhập username mới (6->30 kí tự): ");
  changeTypeTyping.ChangeTypeTyping(sender_psid, "username");
}
const updateUsername = (sender_psid, username) =>{
  db_user.updateUsername(username, sender_psid, (err, result) =>{
    if(!err){
      //console.log(sender_psid +'- đã update thành công!' + username);
    }
    else {
      //database lỗi->TODO:send message 
      console.log('*inputUsername.js update thất bại: ! - '+ err);
    }
  });
}
const check_err_username = (username) => {
  //username: [a->z] [A->Z] [0->9]
  console.log(username);
};

module.exports = {
  set_input_Username: set_input_Username,
  updateUsername: updateUsername,
  check_err_username: check_err_username,
}