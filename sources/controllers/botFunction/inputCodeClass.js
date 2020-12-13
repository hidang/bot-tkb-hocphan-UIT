const sendTextMessage      = require('./sendTextMessage');
const changeTypeTyping = require('./changeTypeTyping');
module.exports.input_Code_Class = (sender_psid) => {
  sendTextMessage.sendTextMessage(sender_psid, "✏ Nhập danh sách mã lớp, mỗi mã lớp trên một dòng, không cách, phẩy <3 : ");
  changeTypeTyping.ChangeTypeTyping(sender_psid, "code_class");
}