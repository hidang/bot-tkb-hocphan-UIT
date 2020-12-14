const STARTED          = require('../controllers/botFunction/start');
const huongdan         = require('../controllers/botFunction/huongdan');
const inputCodeClass   = require('../controllers//botFunction/inputCodeClass');
const changeTypeTyping = require('../controllers/botFunction/changeTypeTyping');
const addID            = require('../controllers/botFunction/addID');
const chuahoanthanh    = require('../controllers/botFunction/chuahoanthanh');
const inputUsername  = require('../controllers/botFunction/inputUsername');
const FB_API           = require('../useAPI/FB_API');
module.exports.handlePostback = function (sender_psid, received_postback) {
  // Get the payload for the postback
  let payload = received_postback.payload;
  switch (payload) {
    case "GET_STARTED_PAYLOAD":
      STARTED(sender_psid);
      addID.FINDtoADDID(sender_psid);
      break;
    case "huong_dan":
      huongdan(sender_psid);
      changeTypeTyping.ChangeTypeTyping(sender_psid, "khong");
      break;
    case "input_code_class":
      inputCodeClass.set_input_Code_Class(sender_psid);
      break;
    case "change_username":{
      inputUsername.set_input_Username(sender_psid);
      break;
    }
    default:
      chuahoanthanh(sender_psid);
      changeTypeTyping.ChangeTypeTyping(sender_psid, "khong");
      break;
  }
}