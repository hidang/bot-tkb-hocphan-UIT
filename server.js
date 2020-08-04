"use strict";
//heroku logs --app=dovanbot2 --tail
///////////////////////////////////////////////SETUP_SERVER//////////////////////////////////////////////////
require("dotenv").config(); //Thư viện dùng .env -> dấu token pass...
const request = require("request");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json(), express.static("public")); // creates express http server
app.set("view engine", "ejs");
app.set("views", "./views");
const server = require("http").Server(app);
server.listen(process.env.PORT || 3000, () =>
  console.log("Server is listeningggggggggggg nè")
);
const io = require("socket.io")(server);

const MongoClient = require("mongodb").MongoClient;
const uri = process.env.URI_NE;

const client = new MongoClient(uri, { useNewUrlParser: true });

//////////////////////////////////////////////END_SETUP_SERVER/////////////////////////////////////////////////
// let type_typing = 0;

/////////////////////////TODO: MongoDB/////////////////////////////////////////////////////////////
client.connect((err) => {
  if (err) throw err;
  console.log("->DA KET NOI thành công database MONGODB!!!!!!######"); //neu chua connect ma goi la crash server, hơi chuối
});

function them_id(sender_psid) {
  var dbo = client.db("dovanbot");
  var myobj = {
    _id: sender_psid,
    type_typing: "input_khong",
    username: null,
    password: null,
  };
  dbo.collection("user").insertOne(myobj, function (err, res) {
    if (err) throw err;
    console.log("DA them_id: " + sender_psid + " thanh cong! ()them_id");
  });
}
function FINDtoADDID(sender_psid) {
  var dbo = client.db("dovanbot");
  dbo.collection("user").findOne({ _id: sender_psid }, function (err, result) {
    if (err) throw err;
    //console.log(result);
    //console.log(result._id);
    //var resultt = result._id;
    if (result == null) {
      //console.log("false -> add");
      them_id(sender_psid);
    }
  });
}
function ChangeTypeTyping(sender_psid, typing) {
  var dbo = client.db("dovanbot");
  // var myquery = { _id: sender_psid };
  // var newvalues = { $set: { type_typing: typing } };
  dbo
    .collection("user")
    .updateOne(
      { _id: sender_psid },
      { $set: { type_typing: typing } },
      function (err, res) {
        if (err) throw err;
        console.log("Up date typeTyping thanhcong");
      }
    );
}
function Change_username(sender_psid, typing) {
  var dbo = client.db("dovanbot");
  // var myquery = { _id: sender_psid };
  // var newvalues = { $set: { type_typing: typing } };
  dbo
    .collection("user")
    .updateOne({ _id: sender_psid }, { $set: { username: typing } }, function (
      err,
      res
    ) {
      if (err) throw err;
      console.log("Up date username thanhcong");
    });
}
let getTypeTyping = function (sender_psid, callback) {
  var dbo = client.db("dovanbot");
  dbo.collection("user").findOne({ _id: sender_psid }, function (err, result) {
    if (err) throw err;
    //console.log(result);
    //console.log(result._id);
    //var resultt = result._id;
    if (result == null) {
      console.log(
        "#ERROR ()handleMessage INPUT SERVER luc STARTed id_user: " +
          sender_psid
      );
    } else {
      //FIXME:getTypeTyping
      //console.log(result.type_typing);
      return callback(result.type_typing);
      //console.log(result.type_typing);
    }
  });
};
/////////////////////////END_MongoDB/////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/", (req, res) => {
  // <=> app.get('/', function(req, res){
  //res.send("Home page. Server chạy ngon lành cành đào");//thường ở đây sẽ chèn html vào để chạy web
  res.render("trangchu"); //dùng farmework ejs để build html trangchu.ejs ra
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////TODO:SOKET_IO//////////////////////////////////////////////////
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
      console.log("webhook EVEN VAOPOOOOOOOOO!!!!!!!");
      //TODO:console.log(webhook_event);

      if (webhook_event.message) {
        handleMessage(sender_psid, webhook_event.message);
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
//////////////////////TODO:EVENT_MESSENGER////////////////////////////////////////////////////////////////
function handleMessage(sender_psid, received_message) {
  let response; // response is a JSON
  //FIXME: chua them chuc nang chong spam
  //FIXME: chua lay dc type ham lol

  if (received_message.text) {
    getTypeTyping(sender_psid, function (kieunhapne) {
      //console.log(kieunhapne);
      switch (kieunhapne) {
        case "input_username": {
          //input username
          console.log("GET USERNAME THANH CONG");
          Change_username(sender_psid, received_message.text);
          ChangeTypeTyping(sender_psid, "input_khong");
          break;
        }
        case "input_password": {
          //input username
          console.log("GET USERNAME THANH CONG");
          ChangeTypeTyping(sender_psid, "input_khong");
          break;
        }
        default:
          // text: `You sent the message: "${received_message.text}".`,
          CHUAHOANTHANH(sender_psid);
          //console.log(kieunhapne);
          break;
      }
    });
  } else if (received_message.attachments) {
    //(2)
    //https://developers.facebook.com/docs/messenger-platform/getting-started/quick-start#setup-complete
    // Gets the URL of the message attachment
    let attachment_url = received_message.attachments[0].payload.url;
    response = {
      recipient: {
        id: sender_psid,
      },
      message: {
        attachment: {
          type: "template",
          payload: {
            template_type: "generic",
            elements: [
              {
                title: "Is this the right picture?",
                subtitle: "Tap a button to answer.",
                image_url: attachment_url,
                buttons: [
                  {
                    type: "postback",
                    title: "OKOKO!",
                    payload: "yes",
                  },
                  {
                    type: "postback",
                    title: "No!",
                    payload: "no",
                  },
                ],
              },
            ],
          },
        },
      },
    };

    callSendAPI("messages", response); // Sends the response message
  } else if (received_message.quickReply) {
  }
}
function handlePostback(sender_psid, received_postback) {
  let response; // response is a JSON

  // Get the payload for the postback
  let payload = received_postback.payload;
  switch (payload) {
    case "yes":
      response = {
        recipient: {
          id: sender_psid,
        },
        message: { text: "Thanks!" },
      };
      callSendAPI("messages", response);
      break;
    case "no":
      response = {
        recipient: {
          id: sender_psid,
        },
        message: { text: "Oops, try sending another image." },
      };
      callSendAPI("messages", response);
      break;
    case "GET_STARTED_PAYLOAD":
      STARTED(sender_psid);
      FINDtoADDID(sender_psid);
      break;
    case "huong_dan":
      HuongDan(sender_psid);
      break;
    case "login":
      LOGIN(sender_psid);
      break;
    case "logout":
      LOGOUT(sender_psid);
      break;

    default:
      CHUAHOANTHANH(sender_psid);
      break;
  }
}
function callSendAPI(style, response) {
  //console.log('Sender PSID by callSendAPI: ' + sender_psid);
  // Send the HTTP request to the Messenger Platform
  request(
    {
      uri: "https://graph.facebook.com/v7.0/me/" + style,
      qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
      method: "POST",
      json: response,
    },
    (err, res, body) => {
      if (!err) {
        //console.log("message: " + response + " ĐÃ ĐƯỢC GỬI!: " + err);
      } else {
        console.error("THẤT BẠI to send message in callSendAPI(): " + err);
      }
    }
  );
}

function CHUAHOANTHANH(sender_psid) {
  let response;
  response = {
    //"text": `Xin chào "${{user_full_name}}!", Bạn cần làm gì?`,
    //"text":"What do you want to do next?",
    recipient: {
      id: sender_psid,
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "button",
          text: "Thật xin lỗi: server chưa update <3",
          buttons: [
            {
              type: "postback",
              title: "📜 Hướng dẫn sử dụng",
              payload: "huong_dan",
            },
            {
              type: "web_url",
              url: "https://dovanbot2.herokuapp.com/",
              title: "🐥 Web liênkếtvớichatbot",
            },
          ],
        },
      },
    },
  };
  callSendAPI("messages", response);
}
function STARTED(sender_psid) {
  //console.log('Vao <postback_payload> NÈNÈ!!!!!!!!!!');
  let response;
  // sender: { id: '3006492652803294' },
  // recipient: { id: '104124098046144' },
  // timestamp: 1596112909237,
  // postback: { title: 'Get Started', payload: 'GET_STARTED_PAYLOAD' }
  response = {
    //"text": `Xin chào "${{user_full_name}}!", Bạn cần làm gì?`,
    //"text":"What do you want to do next?",
    recipient: {
      id: sender_psid,
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "button",
          text:
            "💛 Xin chào bạn đã đến với DOVANBOT, lựa chọn các chức năng tại menu dưới góc nhé.",
          buttons: [
            {
              title: "📜 Hướng dẫn sử dụng",
              type: "postback",
              payload: "huong_dan",
            },
            {
              type: "web_url",
              url: "https://dovanbot2.herokuapp.com/",
              title: "🐥 Trang web liên kết chatbot",
            },
          ],
        },
      },
    },
  };
  callSendAPI("messages", response);
}
function HuongDan(sender_psid) {
  let response;
  response = {
    //"text": `Xin chào "${{user_full_name}}!", Bạn cần làm gì?`,
    //"text":"What do you want to do next?",
    recipient: {
      id: sender_psid,
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "button",
          text:
            "Chat bot với 2 tính năng chính:\n" +
            "📌 1: Tìm kiếm và lưu danh sách mã lớp học để tạo tkb đkhp UIT\n" +
            "📌 2: Xuất hình ảnh tkb từ danh sách mã môn học mà bạn đã nhập vào\n" +
            "📦 Ngoài ra chức năng login sẽ tạo tài khoản và lưu dữ liệu cho bạn\n" +
            "📦 Trang web liên kết sẽ sử dụng cùng cơ sở dữ liệu với chatbot nên chỉ cần login vào web là có thể xem tkb của bạn <3 \n" +
            "👇 Lựa chọn các chức năng tại menu góc dưới nhé.",
          buttons: [
            {
              type: "web_url",
              url: "https://dovanbot2.herokuapp.com/",
              title: "🐥 Trang web liên kết chatbot",
            },
          ],
        },
      },
    },
  };
  callSendAPI("messages", response);
}
function LOGIN(sender_psid) {
  var dbo = client.db("dovanbot");
  dbo.collection("user").findOne({ _id: sender_psid }, function (err, result) {
    if (err) throw err;
    console.log(result);
    if (result.username == null) {
      //chua login
      // console.log("result = null");
      let response;
      response = {
        recipient: {
          id: sender_psid,
        },
        message: {
          text: "✏ Nhập username của bạn: ",
        },
      };
      callSendAPI("messages", response); // Sends the response message
      ChangeTypeTyping(sender_psid, "input_username");
    } else {
      //da login
      let response;
      response = {
        recipient: {
          id: sender_psid,
        },
        message: {
          text: "Bạn đã đăng nhập với username: " + result.username,
        },
      };
      callSendAPI("messages", response); // Sends the response message
    }
  });
}
function LOGOUT(sender_psid) {}

//////////////////////END:EVENT_MESSENGER////////////////////////////////////////////////////////////////
