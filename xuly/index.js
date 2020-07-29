require('dotenv').config();
const request = require('request');


module.exports = { //chìa ra function ....
  handleMessage: handleMessage,
  callSendAPI: callSendAPI,
};

function handleMessage(sender_psid, received_message) {
    //console.log('Sender PSID by handleMessage: ' + sender_psid);
    let response;
    if (received_message.text) {// Check if the message contains text
      // Create the payload for a basic text message
      response = {
        "text": `You sent the message: "${received_message.text}".`
      }
    }
    else if (received_message.attachments) {
  
      // Gets the URL of the message attachment
      let attachment_url = received_message.attachments[0].payload.url;
      response = {
        "attachment": {
          "type": "template",
          "payload": {
            "template_type": "generic",
            "elements": [{
              "title": "Is this the right picture?",
              "subtitle": "Tap a button to answer.",
              "image_url": attachment_url,
              "buttons": [
                {
                  "type": "postback",
                  "title": "Yes!",
                  "payload": "yes",
                },
                {
                  "type": "postback",
                  "title": "No!",
                  "payload": "no",
                }
              ],
            }]
          }
        }
      }
    } 

    callSendAPI(sender_psid, response);// Sends the response message
}
  
function callSendAPI(sender_psid, response) {
  //console.log('Sender PSID by callSendAPI: ' + sender_psid);
  // Construct the message body
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": response
  }
  // Send the HTTP request to the Messenger Platform
  request({
    "uri": "https://graph.facebook.com/v7.0/me/messages",
    "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
    "method": "POST",
    "json": request_body
  }, (err, res, body) => {
    if (!err) {
      console.log('message' + request_body.message +'ĐÃ ĐƯỢC GỬI!: ' +err);
    } else {
      console.error("THẤT BẠI to send message: " + err);
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












