const STARTED          = require('../controllers/botFunction/start');
const huongdan         = require('../controllers/botFunction/huongdan');
const _CodeClass       = require('../controllers/botFunction/_CodeClass');
const _Username        = require('../controllers/botFunction/_Username');
const changeTypeTyping = require('../controllers/botFunction/changeTypeTyping');
const addID            = require('../controllers/botFunction/addID');
const chuahoanthanh    = require('../controllers/botFunction/chuahoanthanh');
const sendTextMessage  = require('../controllers/botFunction/sendTextMessage');
const FB_API           = require('../useAPI/FB_API');
module.exports = async (sender_psid, received_postback) => {
  // Get the payload for the postback
  let payload = received_postback.payload;
  switch (payload) {
    case "GET_STARTED_PAYLOAD":
      STARTED(sender_psid);
      huongdan(sender_psid);
      addID(sender_psid);
      break;
    case "huong_dan":
      huongdan(sender_psid);
      changeTypeTyping(sender_psid, "khong");
      break;
    case "input_code_class":
      _CodeClass.set_input_CodeClass(sender_psid);
      break;
    case "change_username":{
      _Username.set_input_Username(sender_psid);
      break;
    }
    case "view_username":{
      var username = await _Username.getUsername(sender_psid);
      if(username){
        sendTextMessage(sender_psid, "usename hiện tại: " + username);
      }
      changeTypeTyping(sender_psid, "khong");
      break;
    }
    case "get_danh_sach":{
      var codeclass = await _CodeClass.getCodeClass(sender_psid);
      if(codeclass){
        sendTextMessage(sender_psid, `Danh sách của bạn: ${codeclass}`);
      }else{
        sendTextMessage(sender_psid, `Danh sách hiện tại đang trống`);
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