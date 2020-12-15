"use strict";
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json(), express.static("public"));
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