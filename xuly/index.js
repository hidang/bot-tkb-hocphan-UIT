require('dotenv').config();
const request = require('request');

function handleMessage(sender_psid, received_message) {
    // var message = received_message;
    var isEcho = received_message.is_echo;
    var messageId = received_message.mid;
    var appId = received_message.app_id;
    var metadata = received_message.metadata;
  
    // // You may get a text or attachment but not both
    var messageText = received_message.text;
    // var messageAttachments = received_message.attachments;
    // var quickReply = received_message.quick_reply;




    let response;// response is a JSON
    if (received_message.text) {// Check if the message contains text
      // Create the payload for a basic text message
      response = {
        "recipient": {
          "id": sender_psid
        },
        "message": {
          "text": `You sent the message: "${received_message.text}".`
        }
      }
      callSendAPI('messages', response);// Sends the response message

      ///////////////////////////////////////////////////////////
      if (messageText) {
        console.log("Received message for user %d and page %d at %d with message: %s", 
        messageText);
    
        // If we receive a text message, check to see if it matches any special
        // keywords and send back the corresponding example. Otherwise, just echo
        // the text we received.
        switch (messageText.toLowerCase()) {
          case 'image':
            //sendImageMessage(senderID, "http://messengerdemo.parseapp.com/img/rift.png");
            break;
    
          case 'gif':
            //sendGifMessage(senderID);
            break;
    
          case 'audio':
            //sendAudioMessage(senderID);
            break;
    
          case 'video':
            //sendVideoMessage(senderID);
            break;
    
          case 'file':
            //sendFileMessage(senderID);
            break;
    
          case 'button':
            //sendButtonMessage(senderID);
            break;
    
          case 'generic':
            //sendGenericMessage(senderID);
            break;
    
          case 'receipt':
            //sendReceiptMessage(senderID);
            break;
    
          case 'quick reply':
            //sendQuickReply(senderID);
            break        
    
          case 'read receipt':
            //sendReadReceipt(senderID);
            break        
    
          case 'typing on':
            //sendTypingOn(senderID);
            break        
    
          case 'typing off':
            //sendTypingOff(senderID);
            break        
    
          case 'user info':
            //if(firstName)
                //sendTextMessage(senderID,firstName);
            break        
    
          case 'add menu':
            addPersistentMenu();
            break        
    
          case 'remove menu':
            //removePersistentMenu();
            break
        }
      }
      ///////////////////////////////////////////////////////////
    }
    else if (received_message.attachments) {//(2)
      //https://developers.facebook.com/docs/messenger-platform/getting-started/quick-start#setup-complete
      // Gets the URL of the message attachment
      let attachment_url = received_message.attachments[0].payload.url;
      response = {
        "recipient": {
          "id": sender_psid
        },
        "message":{
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
      }
      
      callSendAPI('messages', response);// Sends the response message
    } 
    else if (received_message.quickReply) {
    }
}
function handlePostback(sender_psid, received_postback) {
  let response;// response is a JSON
  
  // Get the payload for the postback
  let payload = received_postback.payload;

  // Set the response based on the postback payload
  if (payload === 'yes') {
    response = { 
      "recipient": {
        "id": sender_psid
      },
      "message": {"text": "Thanks!"} 
    }
    callSendAPI('messages', response);
  } 
  else if (payload === 'no') {
    response = { 
      "recipient": {
        "id": sender_psid
      },
      "message": {"text": "Oops, try sending another image." }
    }
    callSendAPI('messages', response);
  }
  else if (payload === '<postback_payload>') {//NÚT START
    //console.log('Vao <postback_payload> NÈNÈ!!!!!!!!!!');
    response = {// tao menu cho user
      "psid": sender_psid,
      "persistent_menu": [
            {
                "locale": "default",
                "composer_input_disabled": false, // neu true thi close keyborad user
                "call_to_actions": [
                    {
                        "type": "postback",
                        "title": "📂 Chọn môn họccccccc",
                        "payload": "chon_mon_hoc"
                    },
                    {
                        "type": "postback",
                        "title": "📜 Hướng dẫn",
                        "payload": "huong_dan"
                    },
                    {
                        "type": "web_url",
                        "title": "📰 Trang chủ",
                        "url": "https://www.github.com/hidang",
                        "webview_height_ratio": "full"
                    }
                    // {
                    //   "title":"MORE",
                    //   "type":"nested",//nhiều menumenu...
                    //   "call_to_actions":[
                    //     {
                    //       "title":"Who am I",
                    //       "type":"postback",
                    //       "payload":"WHO"
                    //     },
                    //     {
                    //       "title":"Joke",
                    //       "type":"postback",
                    //       "payload":"joke"
                    //     },
                    //     {
                    //       "title":"Contact Info",
                    //       "type":"postback",
                    //       "payload":"CONTACT"
                    //     }
                    //   ]
                    // }
                ]
            }
        ]
    }
    callSendAPI('custom_user_settings', response);
    
    // sender: { id: '3006492652803294' },
    // recipient: { id: '104124098046144' },
    // timestamp: 1596112909237,
    // postback: { title: 'Get Started', payload: '<postback_payload>' }
    response = { 
      //"text": `Xin chào "${{user_full_name}}!", Bạn cần làm gì?`,
      //"text":"What do you want to do next?",
        "recipient":{
          "id": sender_psid
        },
        "message":{
          "attachment":{
            "type":"template",
            "payload":{
              "template_type":"button",
              "text":"What do you want to do next?",
              "buttons":[
                {
                  "type":"web_url",
                  "url":"https://www.messenger.com",
                  "title":"Visit Messenger"
                },
                {
                  "type":"postback",
                  "title":"<LOGIN>",
                  "payload":"<login_ne>"
                },
              ]
            }
          }
        }
    }
    callSendAPI('messages', response);
  }

  
}




function callSendAPI(style, response) {
  //console.log('Sender PSID by callSendAPI: ' + sender_psid);
  // Send the HTTP request to the Messenger Platform
  request({
    "uri": "https://graph.facebook.com/v7.0/me/" + style,
    "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
    "method": "POST",
    "json": response
  }, (err, res, body) => {
    if (!err) {
      console.log('message: ' + response +' ĐÃ ĐƯỢC GỬI!: ' +err);
    } else {
      console.error("THẤT BẠI to send message: " + err);
    }
  }); 
}

function addPersistentMenu(){
  request({
     url: 'https://graph.facebook.com/v7.0/me/messenger_profile',
     qs: { access_token: PAGE_ACCESS_TOKEN },
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
  request({
     url: 'https://graph.facebook.com/v7.0/me/messenger_profile',
     qs: { access_token: PAGE_ACCESS_TOKEN },
     method: 'POST',
     json:{
 "persistent_menu":[
     {
       "locale":"default",
       "composer_input_disabled":false,
       "call_to_actions":[
         {
           "title":"Home",
           "type":"postback",
           "payload":"HOME"
         },
         {
           "title":"MORE...",
           "type":"nested",
           "call_to_actions":[
             {
               "title":"Who am I",
               "type":"postback",
               "payload":"WHO"
             },
             {
               "title":"Joke",
               "type":"postback",
               "payload":"joke"
             },
             {
               "title":"Contact Info",
               "type":"postback",
               "payload":"CONTACT"
             }
           ]
         },
         {
           "type":"web_url",
           "title":"Latest News",
           "url":"http://foxnews.com",
           "webview_height_ratio":"full"
         }
       ]
     },
     {
       "locale":"zh_CN",
       "composer_input_disabled":false
     }
     ]
     }
 
 }, function(error, response, body) {
     console.log(response)
     if (error) {
         console.log('Error sending messages: ', error)
     } else if (response.body.error) {
         console.log('Error: ', response.body.error)
     }
 })
 
 }



module.exports = { //chìa ra function ....
  handleMessage: handleMessage,
  handlePostback: handlePostback,
  callSendAPI: callSendAPI,
};