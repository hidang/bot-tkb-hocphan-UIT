const STARTED          = require('../botFunction/STARTED');
const HuongDan         = require('../botFunction/HuongDan');
// const getTypeTyping    = require('../botFunction/getTypeTyping');
// const Change_username  = require('../botFunction/Change_username');
// const Change_password  = require('../botFunction/Change_password');
// const ChangeTypeTyping = require('../botFunction/ChangeTypeTyping');
const CHUAHOANTHANH    = require('../botFunction/chuahoanthanh');
const FB_API      = require('../useAPI/FB_API');
module.exports.handlePostback = function (sender_psid, received_postback) {
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
      FB_API.callSendAPI("messages", response);
      break;
    case "no":
      response = {
        recipient: {
          id: sender_psid,
        },
        message: { text: "Oops, try sending another image." },
      };
      FB_API.callSendAPI("messages", response);
      break;
    case "GET_STARTED_PAYLOAD":
      STARTED.STARTED(sender_psid);
      //FINDtoADDID(sender_psid);
      break;
    case "huong_dan":
      HuongDan.HuongDan(sender_psid);
      break;
    case "login":
      //LOGIN(sender_psid);
      break;
    case "logout":
      //LOGOUT(sender_psid);
      break;
    case "input_code_class":
      //INPUT_CODE_CLASS(sender_psid);
      break;
    default:
      CHUAHOANTHANH.CHUAHOANTHANH(sender_psid);
      break;
  }
}