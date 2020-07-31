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
  else if (payload === 'GET_STARTED_PAYLOAD') {//NÚT START
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
                        "title": "📂 Chọn môn học",
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
                    },
                    // {
                    //   "title":"🗄 MORE...",
                    //   "type":"nested",//nhiều menumenu...
                    //   "call_to_actions":[
                    //     {
                    //       "title":"Who am I",
                    //       "type":"postback",
                    //       "payload":"WHO"
                    //     },
                    //     {
                    //       "title":"Trang kế tiếp",
                    //       "type":"postback",
                    //       "payload":"next_page"
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
    callSendAPI('custom_user_settings', response);//do not "custom_user_settings" -> web se ko hien ra
    
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
      console.log('message: ' + response +' ĐÃ ĐƯỢC GỬI!: ' +err.message);
    } else {
      console.error("THẤT BẠI to send message: " + err.message);
    }
  }); 
}


module.exports = { //chìa ra function() để index.js khác có thể reques và dùng ....
  handleMessage: handleMessage,
  handlePostback: handlePostback,
  callSendAPI: callSendAPI,
};