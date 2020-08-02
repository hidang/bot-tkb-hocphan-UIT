require("dotenv").config();
const request = require("request");
const xulyserver = require("./server.js");

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function CHUAHOANTHANH(sender_psid) {
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
function STARTED(sender_psid) {
  //console.log('Vao <postback_payload> NÈNÈ!!!!!!!!!!');

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
            "<3 Chào mừng bạn đến với DOVANBOT, lựa chọn các chức năng tại menu dưới góc nhé.",
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
  callSendAPI("messages", response);
}
function HuongDan(sender_psid) {
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
            "Chat bot với 2 tính năng chính:\n" +
            "📌 1: Tìm kiếm và lưu danh sách mã lớp học để tạo tkb đkhp UIT\n" +
            "📌 2: Xuất hình ảnh tkb từ danh sách mã môn học mà bạn đã nhập vào\n" +
            "📦 Ngoài ra chức năng login sẽ tạo tài khoản và lưu dữ liệu cho bạn\n" +
            "📦 Trang web liên kết sẽ sử dụng cùng cơ sở dữ liệu với chatbot nên chỉ cần login vào web là có thể xem tkb của bạn <3 \n" +
            "👇 Lựa chọn các chức năng tại menu góc dưới nhé.",
          buttons: [
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
  callSendAPI("messages", response);
}
function LOGIN(sender_psid) {}
function LOGOUT(sender_psid) {}

function callSendAPI(style, response) {
  //console.log('Sender PSID by callSendAPI: ' + sender_psid);
  // Send the HTTP request to the Messenger Platform
  request(
    {
      uri: "https://graph.facebook.com/v7.0/me/" + style,
      qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
      method: "POST",
      json: response,
    },
    (err, res, body) => {
      if (!err) {
        console.log("message: " + response + " ĐÃ ĐƯỢC GỬI!: " + err);
      } else {
        console.error("THẤT BẠI to send message: " + err);
      }
    }
  );
}
function handleMessage(sender_psid, received_message) {
  // var message = received_message;
  var isEcho = received_message.is_echo;
  var messageId = received_message.mid;
  var appId = received_message.app_id;
  var metadata = received_message.metadata;

  // // You may get a text or attachment but not both
  var messageText = received_message.text;
  // var messageAttachments = received_message.attachments;
  // var quickReply = received_message.quick_reply;

  let response; // response is a JSON
  if (received_message.text) {
    // Check if the message contains text
    // Create the payload for a basic text message
    response = {
      recipient: {
        id: sender_psid,
      },
      message: {
        text: `You sent the message: "${received_message.text}".`,
      },
    };
    callSendAPI("messages", response); // Sends the response message
  } else if (received_message.attachments) {
    //(2)
    //https://developers.facebook.com/docs/messenger-platform/getting-started/quick-start#setup-complete
    // Gets the URL of the message attachment
    let attachment_url = received_message.attachments[0].payload.url;
    response = {
      recipient: {
        id: sender_psid,
      },
      message: {
        attachment: {
          type: "template",
          payload: {
            template_type: "generic",
            elements: [
              {
                title: "Is this the right picture?",
                subtitle: "Tap a button to answer.",
                image_url: attachment_url,
                buttons: [
                  {
                    type: "postback",
                    title: "OKOKO!",
                    payload: "yes",
                  },
                  {
                    type: "postback",
                    title: "No!",
                    payload: "no",
                  },
                ],
              },
            ],
          },
        },
      },
    };

    callSendAPI("messages", response); // Sends the response message
  } else if (received_message.quickReply) {
  }
}
function handlePostback(sender_psid, received_postback) {
  let response; // response is a JSON

  // Get the payload for the postback
  let payload = received_postback.payload;
  switch (payload) {
    case "yes":
      response = {
        recipient: {
          id: sender_psid,
        },
        message: { text: "Thanks!" },
      };
      callSendAPI("messages", response);
      break;
    case "no":
      response = {
        recipient: {
          id: sender_psid,
        },
        message: { text: "Oops, try sending another image." },
      };
      callSendAPI("messages", response);
      break;
    case "GET_STARTED_PAYLOAD":
      STARTED(sender_psid);
      xulyserver.them_id(sender_psid);
      // if (getxulyserver.FINDtoADDID(sender_psid) == false) {
      // }
      break;
    case "huong_dan":
      HuongDan(sender_psid);
      break;
    case "login":
      LOGIN(sender_psid);
      break;
    case "logout":
      LOGOUT(sender_psid);
      break;

    default:
      CHUAHOANTHANH(sender_psid);
      break;
  }
}

module.exports = {
  //chìa ra function() để server.js khác có thể reques và dùng ....
  handleMessage: handleMessage,
  handlePostback: handlePostback,
  callSendAPI: callSendAPI,
};
