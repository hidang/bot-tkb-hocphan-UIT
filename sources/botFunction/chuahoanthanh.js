const callSendAPI = require('../useAPI/callSendAPI');
module.exports.CHUAHOANTHANH = function(sender_psid) {
  let response;
  response = {
    //"text": `Xin chào "${{user_full_name}}!", Bạn cần làm gì?`,
    //"text":"What do you want to do next?",
    recipient: {
      id: sender_psid,
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "button",
          text: "Thật xin lỗi: server chưa update <3",
          buttons: [
            {
              type: "postback",
              title: "📜 Hướng dẫn sử dụng",
              payload: "huong_dan",
            },
            {
              type: "web_url",
              url: "https://dovanbot2.herokuapp.com/",
              title: "🐥 Web liênkếtvớichatbot",
            },
          ],
        },
      },
    },
  };
  callSendAPI("messages", response);
}