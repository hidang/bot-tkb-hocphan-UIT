const FB_API      = require('../../useAPI/FB_API');
const changeTypeTyping = require('./changeTypeTyping');
module.exports.input_Code_Class = (sender_psid) => {
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
  changeTypeTyping.ChangeTypeTyping(sender_psid, "code_class");
}