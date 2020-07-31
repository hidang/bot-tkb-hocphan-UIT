'use strict';
require('dotenv').config();
const xuly = require('./xuly/index.js');

// Imports dependencies and set up http server
const
  express = require('express'),
  bodyParser = require('body-parser'),
  app = express().use(bodyParser.json()); // creates express http server

// Sets server port and logs message on success
app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));


app.get('/', (req, res) => {
  res.send("Home page. Server chạy ngon lành cành đào");
});

// Adds support for GET requests to our webhook
app.get('/webhook', (req, res) => {

  // Your verify token. Should be a random string.
  let VERIFY_TOKEN = process.env.VALIDATION_TOKEN;
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
      //console.log('THAT_BAIIIII');
      res.sendStatus(403);      
    }
  }
});

app.post("/webhook", (req, res) => {
    //console.log(req);

    let body = req.body;
    //console.log(body);
    // Checks this is an event from a page subscription
    if (body.object === 'page') {
      body.entry.forEach(function(entry) {

        let webhook_event = entry.messaging[0];

        let sender_psid = webhook_event.sender.id;
        //console.log('Sender PSID: ' + sender_psid);
        console.log('EVEN VAOPOOOOOOOOO!!!!!!!');
        console.log(webhook_event);

        if (webhook_event.message) {
          xuly.handleMessage(sender_psid, webhook_event.message);        
        } else if (webhook_event.postback) {//(2)
          xuly.handlePostback(sender_psid, webhook_event.postback);
        }
      });
  
      // Returns a '200 OK' response to all requests
      res.status(200).send('EVENT_RECEIVED');
    } else {
      // Returns a '404 Not Found' if event is not from a page subscription
      res.sendStatus(404);
    }
});


