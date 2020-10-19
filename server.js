"use strict";
//heroku logs --app=dovanbot2 --tail
//heroku restart --app=dovanbot2
require("dotenv").config(); //Thư viện dùng .env -> dấu token pass...
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json(), express.static("public")); // creates express http server
app.set("view engine", "ejs");// view engine setup
app.set("views", "./views");// view engine setup
const server = require("http").Server(app);
server.listen(process.env.PORT || 3000, () =>
  console.log("Server is listening nè!")
);

const indexRouter = require('./sources/routes/index');
const webhook = require('./sources/routes/webhook');
app.use('/', indexRouter);
app.use('/webhook', webhook);
///////////////////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////TODO: MongoDB/////////////////////////////////////////////////////////////
// const uri = process.env.URI_NE;
// const MongoClient = require("mongodb").MongoClient;
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect((err) => {
//   if (err) throw err;
//   console.log("->DA KET NOI thành công database MONGODB!!!!!!######"); //neu chua connect ma goi la crash server, hơi chuối
// });
/////////////////////////END_MongoDB/////////////////////////////////////////////////////////////

////////////////////////////SOKET_IO//////////////////////////////////////////////////
//const io = require("socket.io")(server);
// io.on("connection", function (socket) {
//   //khi có người dùng truy cập web thì "connection" sẽ đc truyền qua
//   console.log("socket nè: Có người kết nối: " + socket.id);
//   //----------------------------------------------
//   //nguoi dung ngat ket noi vào trang web
//   socket.on("disconnect", function () {
//     console.log(socket.id + " đã ngắt kết nối rồi nè!!!");
//   });
//   //console.log(FINDtoADDID("123"));
// });
////////////////////////////END_SOKET_IO//////////////////////////////////////////////////


