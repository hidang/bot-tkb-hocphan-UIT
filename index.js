'use strict';
const APP_SECRET = '688ed30a9a6e41538d9e3b1a445dbd90';
const VALIDATION_TOKEN = 'dangdeptraibotchat';
const PAGE_ACCESS_TOKEN = 'EAANhKW19jUABAIhnsQTOaK5OMeEawgflbbiM0ezkx5y1NI5FIBQxsdEKmqDocPt6LzeMDgPuKJdXr4mUziW5by8jn9XEZAyEblOBbfu5Kc9mxOXChPKgnbtCnuibBhaLqZAvqwgMMbgkCMalIgFp3eZC71cgnoZAbGtw33ZB4uVQnNJUBlzCiFK6ecAiGa8tgf3fS8ZCYfym9KYTC99puK';


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
      console.log('THAT_BAIIIII');
      res.sendStatus(403);      
    }
  }
});

app.post("/webhook", (req, res) => {
    console.log(req);

    let body = req.body;
    console.log(body);
    // Checks this is an event from a page subscription
    if (body.object === 'page') {
  
      // Iterates over each entry - there may be multiple if batched
      body.entry.forEach(function(entry) {
  
        // Gets the message. entry.messaging is an array, but 
        // will only ever contain one message, so we get index 0
        let webhook_event = entry.messaging[0];
        console.log(webhook_event);
        var senderId = webhook_event.sender.id;
        var text = webhook_event.message.text;
        console.log(text); // In tin nhắn người dùng
        console.log(senderId);
        if (text == "hi" || text == "hello" || text == "Hello" || text == "Hi") {
            sendMessage(senderId, "xin chào " + senderId + " tên bạn là gì?");
        }else
        if (text == 'info') {
            sendMessage(senderId, "ver 0.1 by hidang, thank you!");
        }else
        if (text == 'menu') {
            sendMessage(senderId, "1. điểm thi '\n' 2. Hình ảnh");
        }else

        sendMessage(senderId, "Trả lời nè: " + text);
          
      });
  
      // Returns a '200 OK' response to all requests
      res.status(200).send('EVENT_RECEIVED');
    } else {
      // Returns a '404 Not Found' if event is not from a page subscription
      res.sendStatus(404);
    }
});

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

