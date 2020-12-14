const STARTED          = require('../controllers/botFunction/start');
const huongdan         = require('../controllers/botFunction/huongdan');
const inputCodeClass   = require('../controllers//botFunction/inputCodeClass');
const changeTypeTyping = require('../controllers/botFunction/changeTypeTyping');
const addID            = require('../controllers/botFunction/addID');
const chuahoanthanh    = require('../controllers/botFunction/chuahoanthanh');
const sendTextMessage  = require('../controllers/botFunction/sendTextMessage');
const _Username  = require('../controllers/botFunction/_Username');
const FB_API           = require('../useAPI/FB_API');
module.exports = async (sender_psid, received_postback) => {
  // Get the payload for the postback
  let payload = received_postback.payload;
  switch (payload) {
    case "GET_STARTED_PAYLOAD":
      STARTED(sender_psid);
      huongdan(sender_psid);
      addID.FINDtoADDID(sender_psid);
      break;
    case "huong_dan":
      huongdan(sender_psid);
      changeTypeTyping(sender_psid, "khong");
      break;
    case "input_code_class":
      inputCodeClass.set_input_Code_Class(sender_psid);
      break;
    case "change_username":{
      _Username.set_input_Username(sender_psid);
      break;
    }
    case "view_username":{
      var username = await _Username.getUsername(sender_psid);
      if(username){
        sendTextMessage.sendTextMessage(sender_psid, "usename hiện tại: " + username);
      }
      changeTypeTyping(sender_psid, "khong");
      break;
    }
    default:
      chuahoanthanh(sender_psid);
      changeTypeTyping(sender_psid, "khong");
      break;
  }
}