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
            var codeclass_array = [];
            result.forEach(element => {
              codeclass_array.push(element.code);
            });
            resolve(codeclass_array);
          }
        }else {
          console.log('*web_user_getCodeClass.js get data thất bại: ! - '+ err);
          resolve(false);
        }
      });
    }
  )
}