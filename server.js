"use strict";
//heroku logs --app=dovanbot2 --tail
//heroku restart --app=dovanbot2
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json(), express.static("public")); // creates express http server
app.set("view engine", "ejs");
app.set("views", "./views");
const server = require("http").Server(app);

server.listen(process.env.PORT || 3000, () =>
  console.log("Server khởi động thành công!")
);

const indexRouter = require('./sources/routes/index');
const webhook = require('./sources/routes/webhook');
app.use('/', indexRouter);
app.use('/webhook', webhook);




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


