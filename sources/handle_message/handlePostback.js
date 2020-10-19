const STARTED          = require('../botFunction/STARTED');
const HuongDan         = require('../botFunction/HuongDan');
const getTypeTyping    = require('../botFunction/getTypeTyping');
const Change_username  = require('../botFunction/Change_username');
const Change_password  = require('../botFunction/Change_password');
const ChangeTypeTyping = require('../botFunction/ChangeTypeTyping');
const CHUAHOANTHANH    = require('../botFunction/chuahoanthanh');
const callSendAPI      = require('../useAPI/callSendAPI');
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
      //FINDtoADDID(sender_psid);
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
    case "input_code_class":
      INPUT_CODE_CLASS(sender_psid);
      break;
    default:
      CHUAHOANTHANH(sender_psid);
      break;
  }
}