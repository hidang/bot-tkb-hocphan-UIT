const FB_API = require('../useAPI/FB_API');
module.exports = function (sender_psid) {
  //console.log('Vao <postback_payload> NÈNÈ!!!!!!!!!!');
  let response;
  // sender: { id: '3006492652803294' },
  // recipient: { id: '104124098046144' },
  // timestamp: 1596112909237,
  // postback: { title: 'Get Started', payload: 'GET_STARTED_PAYLOAD' }
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
          text:
            "💛 Xin chào bạn đã đến với DOVANBOT, lựa chọn các chức năng tại menu dưới góc nhé.",
          buttons: [
            {
              title: "📜 Hướng dẫn sử dụng",
              type: "postback",
              payload: "huong_dan",
            },
            {
              type: "web_url",
              url: "https://dovanbot2.herokuapp.com/",
              title: "🐥 Trang web liên kết chatbot",
            },
          ],
        },
      },
    },
  };
  FB_API.callSendAPI("messages", response);
}