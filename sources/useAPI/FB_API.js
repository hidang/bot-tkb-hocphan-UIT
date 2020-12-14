const request = require('request');
module.exports.callSendAPI = function (style, response) {
  //console.log('Sender PSID by callSendAPI: ' + sender_psid);
  // Send the HTTP request to the Messenger Platform
  request(
    {
      uri: "https://graph.facebook.com/v7.0/me/" + style,
      qs: {access_token: require('../../config/app').fb.PAGE_ACCESS_TOKEN},
      method: "POST",
      json: response,
    },
    (err, res, body) => {
      if (!err) {
        //console.log("message: " + response + " ĐÃ ĐƯỢC GỬI!: " + err);
      } else {
        console.error("THẤT BẠI to send message in callSendAPI(): " + err);
      }
    }
  );
}