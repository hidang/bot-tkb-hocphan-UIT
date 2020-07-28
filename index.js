'use strict';
const APP_SECRET = '688ed30a9a6e41538d9e3b1a445dbd90';
const VALIDATION_TOKEN = 'dangdeptraibotchat';
const PAGE_ACCESS_TOKEN = 'EAANhKW19jUABACTlRpNGZBZB1aqPwZCbXkXkS5YpO1fp1ZA8QRCZA1rSFuZC5QTiaF99zlmLiE1VcIMM8fZBkx2zfjH0GyGLcA9TUj8KSvDVor27dRSHlIyRxuvBB5EPoPub0xgOuRY19ZATDZAhnWmMncZAqUp6PpDdrpScrJPHnLjIaX2HtXdcYYjSoIN4xADO1B8DMzRAXTe4dZADIkeo8ra';


const request = require('request');
// Imports dependencies and set up http server
const
  express = require('express'),
  bodyParser = require('body-parser'),
  app = express().use(bodyParser.json()); // creates express http server

// Sets server port and logs message on success
app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));


app.get('/', (req, res) => {
  res.send("Home page. Server running okay.");
});

// Adds support for GET requests to our webhook
app.get('/webhook', (req, res) => {

  // Your verify token. Should be a random string.
  let VERIFY_TOKEN = VALIDATION_TOKEN;
  console.log("VAO NEEEE");
  // Parse the query params
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];
    
  // Checks if a token and mode is in the query string of the request
  if (mode && token) {
  
    // Checks the mode and token sent is correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      
      // Responds with the challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);      
    }
  }
});

app.post("/webhook", (req, res) => {
    var entries = req.body.entry;
    for (var entry of entries) {
      var messaging = entry.messaging;
      for (var message of messaging) {
        var senderId = message.sender.id;
        if (message.message) {
          // If user send text
          if (message.message.text) {
            var text = message.message.text;
            console.log(text); // In tin nhắn người dùng
            console.log(senderId);
            sendMessage(senderId, "Trả lời nè: " + text);
          }
        }
      }
    }
   
    res.status(200).send("OK");
});

// Gửi thông tin tới REST API để Bot tự trả lời
function sendMessage(senderId, message) {
  request.post({
    url: 'https://graph.facebook.com/v7.0/me/messages?access_token='+PAGE_ACCESS_TOKEN,
    json: {
        method: 'POST',
        "messaging_type": 'RESPONSE',
        "recipient":{
          "id": senderId
        },
        "message":{
          "text": message
        }
    }
  });
}

