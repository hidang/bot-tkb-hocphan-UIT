module.exports.INPUT_CODE_CLASS = function (sender_psid) {
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
  callSendAPI("messages", response); // Sends the response message
  ChangeTypeTyping(sender_psid, "input_code_class");
}