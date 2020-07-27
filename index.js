'use strict';
const APP_SECRET = '688ed30a9a6e41538d9e3b1a445dbd90';
const VALIDATION_TOKEN = 'dangdeptraibotchat';
const PAGE_ACCESS_TOKEN = 'EAANhKW19jUABADk7xAAZCDe38LjaXyKxZA4qtMLyyU6bfRIGrGFYZC21Kq1Hp4ZCbWqZADINQy7b1tHT1pfLIF5vOnuJqfqDFCAhlafxdZBZBSyyQR2ZACHde9YgcivPnrXZA5SsOW5liMZCo055CZCZCtfVndwOK2ABYwWZADtDXp8ZCVbLS5oTfZA2EUbEyZB470LMWH9qyBQILso7lHOcD7pFSjJK';



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
    let body = req.body;

    if (body.object === 'page') {
        // Iterates over each entry - there may be multiple if batched
        body.entry.forEach(function(entry) {

            // Gets the message. entry.messaging is an array, but
            // will only ever contain one message, so we get index 0
            let webhook_event = entry.messaging[0];
            console.log(webhook_event);

            // Get the sender PSID
            let sender_psid = webhook_event.sender.id;
            console.log('Sender PSID: ' + sender_psid);

            // Check if the event is a message or postback and
            // pass the event to the appropriate handler function
            if (webhook_event.message) {
                sendMessage(sender_psid, webhook_event.message.text);
                console.log(webhook_event.message);
            } else if (webhook_event.postback) {
                console.log(webhook_event.postback);
            }  
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
  request({
    url: 'https://graph.facebook.com/v7.0/me/messages',
    qs: {
      access_token: PAGE_ACCESS_TOKEN,
    },
    method: 'POST',
    json: {
      "recipient": {
        "id": senderId
      },
      "message": {
        "text": message
      },
    }
  });
}
