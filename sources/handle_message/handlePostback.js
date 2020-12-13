const STARTED          = require('../controllers/botFunction/start');
const huongdan         = require('../controllers/botFunction/huongdan');
// const getTypeTyping    = require('../botFunction/getTypeTyping');
// const Change_username  = require('../botFunction/Change_username');
// const Change_password  = require('../botFunction/Change_password');
// const ChangeTypeTyping = require('../botFunction/ChangeTypeTyping');
const addID      = require('../controllers/botFunction/addID');
const chuahoanthanh    = require('../controllers/botFunction/chuahoanthanh');
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
      STARTED(sender_psid);
      addID.FINDtoADDID(sender_psid);
      break;
    case "huong_dan":
      huongdan(sender_psid);
      break;
    case "input_code_class":
      //INPUT_CODE_CLASS(sender_psid);
      break;
    default:
      chuahoanthanh(sender_psid);
      break;
  }
}