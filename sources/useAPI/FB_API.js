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
    //🔔!! LỖI PAGE_ACCESS_TOKEN THÌ err vẫn bằng null 😕 nên dẹp luôn.
    // (err, res, body) => {
    //   if (!err) {
    //     console.log("message ĐÃ ĐƯỢC GỬI! ",res);
    //   } else {
    //     console.error("THẤT BẠI: send message in *callSendAPI()");
    //   }
    // }
  );
}