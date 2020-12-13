const FB_API = require('../../useAPI/FB_API');
module.exports.sendTextMessage = (sender_psid, text) => {
  var response = {
    recipient: {
      id: sender_psid,
    },
    message: {
      text: text,
    },
  };
  FB_API.callSendAPI("messages", response); // Sends the response message
}