"use strict";
///////////////////////////////////////////////SETUP_SERVER//////////////////////////////////////////////////
const xuly = require("./xuly/index.js"); //xuly tin nhan
require("dotenv").config(); //Thư viện dùng .env -> dấu token pass...

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json(), express.static("public")); // creates express http server
app.set("view engine", "ejs");
app.set("views", "./views");
const server = require("http").Server(app);
server.listen(process.env.PORT || 3000, () =>
  console.log("Server is listeningggggggggggg")
);
const io = require("socket.io")(server);

const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://hidang:hidang582279@cluster0.wdxpd.mongodb.net/dovanbot?authSource=admin&replicaSet=atlas-wrg027-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
module.exports = {
  //chìa ra function() để .js khác có thể reques và dùng ....
  them_id: them_id,
  FINDtoADDID: FINDtoADDID,
};
//////////////////////////////////////////////END_SETUP_SERVER/////////////////////////////////////////////////

/////////////////////////TODO: MongoDB/////////////////////////////////////////////////////////////
client.connect((err) => {
  if (err) throw err;
  console.log("->DA KET NOI database MONGODB!!!!!!######"); //neu chua connect ma goi la crash server, hơi chuối
});
function them_id(sender_psid) {
  var dbo = client.db("dovanbot");
  var myobj = {
    _id: sender_psid,
  };
  dbo.collection("user").insertOne(myobj, function (err, res) {
    if (err) throw err;
    console.log("DA them_id thanh cong!");
  });
}
function FINDtoADDID(sender_psid) {
  var kq = false;
  var dbo = client.db("dovanbot");
  dbo.collection("user").findOne({ _id: sender_psid }, function (err, result) {
    if (err) throw err;
    console.log(result);
    if (result == null) {
      kq = false;
    } else {
      kq = true;
    }
  });
  return kq;
}
/////////////////////////TODO: END_MongoDB/////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/", (req, res) => {
  // <=> app.get('/', function(req, res){
  //res.send("Home page. Server chạy ngon lành cành đào");//thường ở đây sẽ chèn html vào để chạy web
  res.render("trangchu"); //dùng farmework ejs để build html trangchu.ejs ra
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////SOKET_IO//////////////////////////////////////////////////
io.on("connection", function (socket) {
  //khi có người dùng truy cập web thì "connection" sẽ đc truyền qua
  console.log("socket nè: Có người kết nối: " + socket.id);
  //----------------------------------------------
  //nguoi dung ngat ket noi vào trang web
  socket.on("disconnect", function () {
    console.log(socket.id + " đã ngắt kết nối rồi nè!!!");
  });
  //console.log(FINDtoADDID("123"));
});
////////////////////////////END_SOKET_IO//////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////
// Adds support for GET/POST requests to our webhook -> của FB Messenger////////////////////////////////////////
app.get("/webhook", (req, res) => {
  // Your verify token. Should be a random string.
  let VERIFY_TOKEN = process.env.VALIDATION_TOKEN;
  console.log("VAO NEEEE");
  // Parse the query params
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  // Checks if a token and mode is in the query string of the request
  if (mode && token) {
    // Checks the mode and token sent is correct
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      // Responds with the challenge token from the request
      console.log("WEBHOOK_VERIFIED");
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
  if (body.object === "page") {
    body.entry.forEach(function (entry) {
      let webhook_event = entry.messaging[0];

      let sender_psid = webhook_event.sender.id;
      //console.log('Sender PSID: ' + sender_psid);
      console.log("EVEN VAOPOOOOOOOOO!!!!!!!");
      console.log(webhook_event);

      if (webhook_event.message) {
        xuly.handleMessage(sender_psid, webhook_event.message);
      } else if (webhook_event.postback) {
        //(2)
        xuly.handlePostback(sender_psid, webhook_event.postback);
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
