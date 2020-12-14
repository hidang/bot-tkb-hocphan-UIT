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
      console.log('*_Username.js update thất bại: ! - '+ err);
    }
  });
}
const check_err_username = (username) => {
  //username: [a->z] [A->Z] [0->9]
  // if(item.tel1.match(letters)) //🧨match just match on typeof string
  var letters = /^[a-z-A-Z-0-9]+$/;//✂ match([a->z][A->Z][0->9])
  var username_length = username.length;
  if (username_length < 6 | username_length > 30) {
    return "username phải tối thiểu 6, tối đa 30 kí tự, xin hãy nhập lại"
  }
  if(username.match(letters)){
    return null;
  }
  return "username phải nằm trong các kí tự: [a->z][A->Z][0->9], xin hãy nhập lại"
};
const getUsername = (sender_psid) => {
  return new Promise(
    function (resolve) {
      db_user.getTypeTyping(sender_psid, (err, result) =>{
        if(!err) {
          console.log(sender_psid +'- đã get thành công! ' + result);
          resolve(result);
        }else {
          console.log('*_Username.js get data thất bại: ! - '+ err);
          resolve(false);
        }
      });
    }
  )
}
module.exports = {
  set_input_Username: set_input_Username,
  updateUsername: updateUsername,
  check_err_username: check_err_username,
  getUsername: getUsername,
}