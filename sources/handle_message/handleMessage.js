const getTypeTyping =  require('../botFunction/getTypeTyping');
const Change_username = require('../botFunction/Change_username');
const Change_password = require('../botFunction/Change_password');
const ChangeTypeTyping = require('../botFunction/ChangeTypeTyping');
const CHUAHOANTHANH = require('../botFunction/chuahoanthanh');
const callSendAPI = require('../useAPI/callSendAPI');

module.exports.handleMessage = function (sender_psid, received_message) {
  let response; // response is a JSON
  //FIXME: chua them chuc nang chong spam
  //FIXME: chua lay dc type ham lol

  if (received_message.text) {
    getTypeTyping(sender_psid, function (result) {
      //console.log(kieunhapne);
      switch (result.type_typing) {
        case "input_username": {
          Change_username(sender_psid, received_message.text);
          if (result.password == null) {
            let response;
            response = {
              recipient: {
                id: sender_psid,
              },
              message: {
                text: "✏ Nhập password của bạn: ",
              },
            };
            callSendAPI("messages", response); // Sends the response message
            ChangeTypeTyping(sender_psid, "input_password");
          } else {
            let response;
            response = {
              recipient: {
                id: sender_psid,
              },
              message: {
                text: "Bạn đã đăng nhập với password: " + result.password,
              },
            };
            callSendAPI("messages", response); // Sends the response message
          }
          break;
        }
        case "input_password": {
          //input username
          //console.log("GET PASSWORD THANH CONG");
          Change_password(sender_psid, received_message.text);

          let response;
          response = {
            recipient: {
              id: sender_psid,
            },
            message: {
              text: "💛 Bạn đã đăng nhập/tạo tài khoản thành công",
            },
          };
          callSendAPI("messages", response); // Sends the response message
          ChangeTypeTyping(sender_psid, "input_khong");
          break;
        }
        case "input_code_class": {
          //console.log(received_message.text);
          //var pos = received_message.text.search("\n");
          //console.log(pos);
          // var content = received_message.text.substr(pos);
          // console.log(content);
          var CODE_CLASS = [];
          var temp = 0;
          var n = received_message.text.length;
          //console.log(n);
          if (n <= 359) {
            for (var i = 0; i < n; i++) {
              if (received_message.text[i] == "\n") {
                CODE_CLASS.push(received_message.text.slice(temp, i));
                temp = i + 1;
              }
            }
            CODE_CLASS.push(received_message.text.slice(temp, n)); //dòng cuối

            thaotac_excel.set_Code_Class(CODE_CLASS, client, function (result) {
              console.log(result);
            });
            //delete thaotac_excel();
            //console.log(kq_code_class.code_suscess[0]);
            //input danh sách thành công bạn có muốn lấy hình ảnh thời khóa biểu của bạn ngay bây giờ? -> câu trả lời nhanh
            ChangeTypeTyping(sender_psid, "input_khong");
          } else {
            let response;
            response = {
              recipient: {
                id: sender_psid,
              },
              message: {
                text:
                  "Danh sách có vẻ quá dài hoặc không hợp lệ, xin vui lòng nhập lại, nếu đây là lỗi hệ thống xin báo lại cho admin",
              },
            };
            callSendAPI("messages", response); // Sends the response message
          }

          break;
        }
        default:
          // text: `You sent the message: "${received_message.text}".`,
          CHUAHOANTHANH(sender_psid);
          //console.log(kieunhapne);
          break;
      }
    });
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