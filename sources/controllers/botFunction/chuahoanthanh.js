const FB_API = require('../../useAPI/FB_API');
module.exports = (sender_psid) => {
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
          text: "Thật xin lỗi: server đang hoàn thiện tính năng này <3",
          buttons: [
            {
              type: "postback",
              title: "📜 Hướng dẫn sử dụng",
              payload: "huong_dan",
            },
            {
              type: "web_url",
              url: require('../../../config/app').web.uri,
              title: "📎Trang web liên kết",
            },
          ],
        },
      },
    },
  };
  FB_API.callSendAPI("messages", response);
}