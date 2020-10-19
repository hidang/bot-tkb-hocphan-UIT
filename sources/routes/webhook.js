const express = require('express');
const router = express.Router();

//const handleMessage = require('../handle_message/handleMessage');
const handlePostback = require('../handle_message/handlePostback');
// Adds support for GET/POST requests to our webhook -> của FB Messenger////////////////////////////////////////
router.get("/webhook", (req, res) => {
  // Your verify token. Should be a random string.
  let VERIFY_TOKEN = process.env.VALIDATION_TOKEN;
  // Parse the query params
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  // Checks if a token and mode is in the query string of the request
  if (mode && token) {
    // Checks the mode and token sent is correct
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      // Responds with the challenge token from the request
      //console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      //console.log('THAT_BAIIIII');
      res.sendStatus(403);
    }
  }
});
router.post("/webhook", (req, res) => {
  //console.log(req);
  let body = req.body;
  //console.log(body);
  // Checks this is an event from a page subscription
  if (body.object === "page") {
    body.entry.forEach(function (entry) {
      let webhook_event = entry.messaging[0];

      let sender_psid = webhook_event.sender.id;
      //console.log('Sender PSID: ' + sender_psid);
      console.log("webhook EVEN VAOPOOOOOOOOO!!!!!!!");
      //TODO:console.log(webhook_event);

      if (webhook_event.message) {
        console.log(sender_psid +': ' +webhook_event.message);
        //handleMessage(sender_psid, webhook_event.message);
      } else if (webhook_event.postback) {
        //(2)
        handlePostback(sender_psid, webhook_event.postback);
      }
    });

    // Returns a '200 OK' response to all requests
    res.status(200).send("EVENT_RECEIVED");
  } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }
});
// END// Adds support for GET/POST requests to our webhook -> của FB Messenger////////////////////////////////////////
module.exports = router;