const chuahoanthanh = require('../controllers/botFunction/chuahoanthanh');
//const FB_API        = require('../useAPI/FB_API');
const getTypeTyping = require('../controllers/botFunction/getTypeTyping');
const sendTextMessage = require('../controllers/botFunction/sendTextMessage');
module.exports.handleMessage = async (sender_psid, received_message) => {
  //FIXME: chua them chuc nang chong spam
  if (received_message.text) {
    let type_typing = await getTypeTyping.getTypeTyping(sender_psid);
    if (!type_typing) {
      type_typing = 'thatbai';
    }
    switch (type_typing) {
      case "input_username": {
        break;
      }
      case "code_class": {
        if (false) {

          //input danh sách thành công bạn có muốn lấy hình ảnh thời khóa biểu của bạn ngay bây giờ? -> câu trả lời nhanh
          //ChangeTypeTyping(sender_psid, "input_khong");
        } else {
          sendTextMessage.sendTextMessage(
            sender_psid, 
            "Danh sách có vẻ quá dài hoặc không hợp lệ, xin vui lòng nhập lại, nếu đây là lỗi hệ thống xin báo lại cho admin"
          );
        }
        break;
      }
      case "thatbai":{
        sendTextMessage.sendTextMessage(
          sender_psid, 
          "Lỗi không mong muốn từ phía database server, thành thật xin lỗi, xin thử lại sau ít phút."
        );
      }
      default:
        chuahoanthanh(sender_psid);
        break;
    }
  } 
//    else if (received_message.attachments) {
//     //(2)
//     //https://developers.facebook.com/docs/messenger-platform/getting-started/quick-start#setup-complete
//     // Gets the URL of the message attachment
//     let attachment_url = received_message.attachments[0].payload.url;
//     response = {
//       recipient: {
//         id: sender_psid,
//       },
//       message: {
//         attachment: {
//           type: "template",
//           payload: {
//             template_type: "generic",
//             elements: [
//               {
//                 title: "Is this the right picture?",
//                 subtitle: "Tap a button to answer.",
//                 image_url: attachment_url,
//                 buttons: [
//                   {
//                     type: "postback",
//                     title: "OKOKO!",
//                     payload: "yes",
//                   },
//                   {
//                     type: "postback",
//                     title: "No!",
//                     payload: "no",
//                   },
//                 ],
//               },
//             ],
//           },
//         },
//       },
//     };

//     callSendAPI("messages", response); // Sends the response message
//   } else if (received_message.quickReply) {
//   }
}