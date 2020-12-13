const FB_API      = require('../../useAPI/FB_API');
module.exports.input_Code_Class = function (sender_psid) {
  let response;
  response = {
    recipient: {
      id: sender_psid,
    },
    message: {
      text:
        "✏ Nhập danh sách mã lớp, mỗi mã lớp trên một dòng, không cách, phẩy <3 : ",
    },
  };
  FB_API.callSendAPI("messages", response);
  //ChangeTypeTyping(sender_psid, "input_code_class");
}