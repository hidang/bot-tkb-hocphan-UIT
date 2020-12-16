const chuahoanthanh    = require('../controllers/botFunction/chuahoanthanh');
//const FB_API         = require('../useAPI/FB_API');
const changeTypeTyping = require('../controllers/botFunction/changeTypeTyping');
const getTypeTyping    = require('../controllers/botFunction/getTypeTyping');
const sendTextMessage  = require('../controllers/botFunction/sendTextMessage');
const _Username        = require('../controllers/botFunction/_Username');
const _CodeClass       = require('../controllers/botFunction/_CodeClass');
module.exports = async (sender_psid, received_message) => {
  //FIXME: chua them chuc nang chong spam
  if (received_message.text) {
    let type_typing = await getTypeTyping(sender_psid);//that bai-> resolve(false);
    //console.log(type_typing);
    switch (type_typing) {
      case "code_class": {
        if (!_CodeClass.check_CodeClass_length(received_message.text)) {//if độ dài ok
          var code_class_array = _CodeClass.conver_string2array(received_message.text);
          //console.log(code_class_array);
          var err = _CodeClass.check_CodeClass_err(code_class_array);
          if(!err){//update ALL
            _CodeClass.update_CodeClass(sender_psid, code_class_array);//update ALL
            sendTextMessage(
              sender_psid, 
              "🎉Cập nhập danh sách thành công"
            );
            changeTypeTyping(sender_psid, "khong");
          }else{
            //TODO: nếu tất cả lỗi thì: ->thất bại
            // chỉ lỗi 1 2 code thì: //FIXME: check tồn tại?
            //2 option[lưu những mã còn lại, không lưu gì hết]
          }
        } else {
          sendTextMessage(
            sender_psid, 
            "Danh sách có vẻ quá ngắn|dài hoặc không hợp lệ, xin vui lòng nhập lại, nếu đây là lỗi hệ thống xin báo lại cho admin"
          );
        }
        break;
      }
      case "username":{
        var err = _Username.check_err_username(received_message.text);
        if(!err) err = await _Username.check_trung_username(received_message.text);
        if(!err){
          _Username.updateUsername(sender_psid, received_message.text);
          changeTypeTyping(sender_psid, "khong");
          sendTextMessage(
            sender_psid, 
            "Thay đổi thành công, username của bạn hiện tại là: " + received_message.text
          );
        } else{
          sendTextMessage(
            sender_psid, 
            "Thay đổi thất bại, "+ err
          );
        }
        break;
      }
      case false:{
        sendTextMessage(
          sender_psid, 
          "Lỗi không mong muốn từ phía database server, xin thử lại sau ít phút 👉👈"
        );
        break;
      }
      default:
        sendTextMessage(
          sender_psid, 
          "👉👈Thao tác không xác định xin hãy chọn chức năng tại Menu bot 👇"
        );
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