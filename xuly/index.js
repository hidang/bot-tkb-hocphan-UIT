require('dotenv').config();
const request = require('request');

function handleMessage(sender_psid, received_message) {

    let response;
  
    // Check if the message contains text
    if (received_message.text) {    
  
      // Create the payload for a basic text message
      response = {
        "text": `You sent the message: "${received_message.text}". Now send me an image!`

      }
    }  
    
    // Sends the response message
    callSendAPI(sender_psid, response);    
}
  
function callSendAPI(sender_psid, response) {
  // Construct the message body
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": response
  }

  // Send the HTTP request to the Messenger Platform
  request({
    "uri": "https://graph.facebook.com/v2.6/me/messages",
    "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
    "method": "POST",
    "json": request_body
  }, (err, res, body) => {
    if (!err) {
      console.log('message ĐÃ ĐƯỢC GỬI!')
    } else {
      console.error("THẤT BẠI to send message:" + err);
    }
  }); 
}


function handlePostback(sender_psid, received_postback) {
    let response;
    
    // Get the payload for the postback
    let payload = received_postback.payload;
  
    // Set the response based on the postback payload
    if (payload === 'yes') {
      response = { "text": "Thanks!" }
    } else if (payload === 'no') {
      response = { "text": "Oops, try sending another image." }
    }
    // Send the message to acknowledge the postback
    callSendAPI(sender_psid, response);
}
  
  
  // Gửi thông tin tới REST API để Bot tự trả lời
function sendMessage(senderId, message) {
    request.post({
      url: 'https://graph.facebook.com/v7.0/me/messages?access_token='+PAGE_ACCESS_TOKEN,
      json: {
          method: 'POST',
          "recipient":{
            "id": senderId
          },
          "message":{
            "text": message
          }
      }
    });
}
  

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
  
}













module.exports = { //chia ra function ....
  handleMessage: handleMessage,
  sendMessage: sendMessage,
};