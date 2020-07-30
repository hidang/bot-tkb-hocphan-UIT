require('dotenv').config();
const request = require('request');

module.exports = { //chìa ra function ....
  handleMessage: handleMessage,
  handlePostback: handlePostback,
  callSendAPI: callSendAPI,
  addPersistentMenu: addPersistentMenu,

};

function handleMessage(sender_psid, received_message) {
    // var message = received_message;
    var isEcho = received_message.is_echo;
    var messageId = received_message.mid;
    var appId = received_message.app_id;
    var metadata = received_message.metadata;
  
    // // You may get a text or attachment but not both
    // var messageText = received_message.text;
    // var messageAttachments = received_message.attachments;
    // var quickReply = received_message.quick_reply;

    let response;
    if (received_message.text) {// Check if the message contains text
      // Create the payload for a basic text message
      response = {
        "text": `You sent the message: "${received_message.text}".`
      }
      callSendAPI(sender_psid, response);// Sends the response message
    }
    else if (received_message.attachments) {//(2)
      //https://developers.facebook.com/docs/messenger-platform/getting-started/quick-start#setup-complete
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
                  "title": "OKOKO!",
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
      callSendAPI(sender_psid, response);// Sends the response message
    } 
    else if (received_message.quickReply) {
    }

    //callSendAPI(sender_psid, response);// Sends the response message
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



function addPersistentMenu(){
  request({
     url: 'https://graph.facebook.com/v7.0/me/messenger_profile',
     qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
     method: 'POST',
     json:{
   "get_started":{
     "payload":"GET_STARTED_PAYLOAD"
    }
  }
 }, function(error, response, body) {
     console.log("Add persistent menu " + response)
     if (error) {
         console.log('Error sending messages: ', error)
     } else if (response.body.error) {
         console.log('Error: ', response.body.error)
     }
 })
}








