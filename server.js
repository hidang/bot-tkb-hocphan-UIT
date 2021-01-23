"use strict";
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(express.json({ limit: '400kb' }));// body-parser defaults to a body size limit of 400kb
app.use(bodyParser.json(), express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

const server = require("http").Server(app);
server.listen(process.env.PORT || 3000, () =>
  console.log("Server khởi động thành công! PORT:", process.env.PORT || 3000)
);

app.use('/webhook', require('./sources/routes/webhook'));
app.use('/', require('./sources/routes/index'));

const helmet = require('helmet');
app.use(helmet());