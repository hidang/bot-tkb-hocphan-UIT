const fs = require('fs');
const sendTextMessage      = require('./sendTextMessage');
const changeTypeTyping = require('./changeTypeTyping');
const db_user = require('../../utils/handlers/users');

const set_input_CodeClass = (sender_psid) => {
  sendTextMessage(sender_psid, "✏ Nhập danh sách mã lớp, mỗi mã lớp trên một dòng, không cách, phẩy <3 : ");
  changeTypeTyping(sender_psid, "code_class");
}
const check_CodeClass_length = (text_class) => {
  if (text_class.length < 4 | text_class.length >350){
    return true;//quá ngắn hoặc quá dài
  }
  return false;//ok
}
const conver_string2array = (text_class) => {
  var code_class_array = text_class
                            .toUpperCase()
                            .split('\n')//chặt mỗi dòng thành từng phần tử
                            .map(srt => srt.trim())//xóa kí tự khoảng trắng ở đầu và cuối
                            .filter(srt => srt !== '');//xóa ''
  return code_class_array;
}
const check_CodeClass_err = (code_class_array) => {//😫🤗
  // var data_tkb;
  // fs.readFile('../../../public/tkbhp.json', 'utf8', function (err, data) {
  //   if (err) data_tkb = 'Lỗi data bạn không thể check'+err;
  //   data_tkb = JSON.parse(data);
  // });
  // console.log(data_tkb);
  return;//FIXME:
}
const update_CodeClass = (sender_psid, code_class) => {
  db_user.updateCodeClass(code_class, sender_psid, (err, result) =>{
    if(!err){
      //console.log(sender_psid +'- đã update thành công!' + username);
    }
    else {
      //database lỗi->TODO:send message 
      console.log('*_Username.js update thất bại: ! - '+ err);
    }
  });
}
const getCodeClass = (sender_psid) => { 
  return new Promise(
    function (resolve) {
      db_user.getCodeClass(sender_psid, (err, result) =>{
        if(!err) {
          //console.log(sender_psid +'- đã getCodeClass thành công! ' + result);
          if (!result) {
            resolve(result);
          }else{
            var string_codeclass = '';
            result.forEach(element => {
              string_codeclass += `${element.code}\n`;
            });
            resolve(string_codeclass);
          }
        }else {
          console.log('*_CodeClass.js get data thất bại: ! - '+ err);
          resolve(false);
        }
      });
    }
  )
}
module.exports = {
  set_input_CodeClass: set_input_CodeClass,
  check_CodeClass_length: check_CodeClass_length,
  check_CodeClass_err: check_CodeClass_err,
  update_CodeClass: update_CodeClass,
  conver_string2array: conver_string2array,
  getCodeClass: getCodeClass,
}