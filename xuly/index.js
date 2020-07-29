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
      // // Create the payload for a basic text message
      // response = {
      //   "text": `You sent the message: "${received_message.text}".`
      // }
      switch (received_message.text.toLowerCase()) {   
        case 'add menu':
          addPersistentMenu();
          break

        case 'typing on':
          sendTypingOn(sender_psid);
          break        
    
        case 'typing off':
          sendTypingOff(sender_psid);
          break
      }
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
    else if (received_message.quickReply) {
      

    }

    callSendAPI(sender_psid, response);// Sends the response message
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
//   request({
//      url: 'https://graph.facebook.com/v2.6/me/messenger_profile',
//      qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
//      method: 'POST',
//      json:{
//  "persistent_menu":[
//      {
//        "locale":"default",
//        "composer_input_disabled":true,
//        "call_to_actions":[
//          {
//            "title":"Home",
//            "type":"postback",
//            "payload":"HOME"
//          },
//          {
//            "title":"Nested Menu Example",
//            "type":"nested",
//            "call_to_actions":[
//              {
//                "title":"Who am I",
//                "type":"postback",
//                "payload":"WHO"
//              },
//              {
//                "title":"Joke",
//                "type":"postback",
//                "payload":"joke"
//              },
//              {
//                "title":"Contact Info",
//                "type":"postback",
//                "payload":"CONTACT"
//              }
//            ]
//          },
//          {
//            "type":"web_url",
//            "title":"Latest News",
//            "url":"http://foxnews.com",
//            "webview_height_ratio":"full"
//          }
//        ]
//      },
//      {
//        "locale":"zh_CN",
//        "composer_input_disabled":false
//      }
//      ]
//      }
 
//  }, function(error, response, body) {
//      console.log(response)
//      if (error) {
//          console.log('Error sending messages: ', error)
//      } else if (response.body.error) {
//          console.log('Error: ', response.body.error)
//      }
//  })
 
 }


 function callSendAPI(messageData) {
  request({
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: PAGE_ACCESS_TOKEN },
    method: 'POST',
    json: messageData

  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var recipientId = body.recipient_id;
      var messageId = body.message_id;

      if (messageId) {
        console.log("Successfully sent message with id %s to recipient %s", 
          messageId, recipientId);
      } else {
      console.log("Successfully called Send API for recipient %s", 
        recipientId);
      }
    } else {
      console.error("Unable to send message. :" + response.error);
    }
  });  
}

function sendTypingOn(recipientId) {
  console.log("Turning typing indicator on");

  var messageData = {
    recipient: {
      id: recipientId
    },
    sender_action: "typing_on"
  };

  callSendAPI(messageData);
}

function sendTypingOff(recipientId) {
  console.log("Turning typing indicator off");

  var messageData = {
    recipient: {
      id: recipientId
    },
    sender_action: "typing_off"
  };

  callSendAPI(messageData);
}





