const db_user = require('../../utils/handlers/users');

module.exports.FINDtoADDID = (sender_psid) => {
  db_user.createNew(sender_psid, (err, result) => {
    if(result) console.log(sender_psid +'- đã được thêm thành công! *addIDs');
    else //có 2 TH lỗi ở đây: 
      if (err === null) console.log(sender_psid +'- đã tồn tại!'); //TODO:send message chào mừng quay lại
        else /*if(err !== null)*/ {
          
          //TODO:send message đến user ib
          console.log('*addID.js them id mới thất bại: ! - '+ err);//database lỗi
        }
  });
}