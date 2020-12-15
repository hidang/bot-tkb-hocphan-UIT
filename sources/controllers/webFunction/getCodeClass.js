const db_user = require('../../utils/handlers/users');
module.exports = (username) => {
  return new Promise(
    function (resolve) {
      db_user.web_user_getCodeClass(username, (err, result) =>{
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
          console.log('*web_user_getCodeClass.js get data thất bại: ! - '+ err);
          resolve(false);
        }
      });
    }
  )
}