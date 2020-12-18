const express = require('express');
const router = express.Router();

/////////////////TODO:Chống spam cho trang web/////////////////
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 15, // limit each IP to 15 requests per windowMs
  message:
  "Server cùi, spam là admin khóc 😢😢😢 -Thử lại sau vài phút!"
});
router.use(limiter);
///////////////////////////////////////////
// router.set("view engine", "ejs");router.set("views", "./views");//error vì lúc này đang là router của app(server.js)
router.get("/", (req, res) => {  // <=> router.get('/', function(req, res){
  //res.send("Home page. Server chạy ngon lành cành đào");//ở đây sẽ chèn html vào để chạy web
  res.render("pages/trangchu"); //dùng farmework ejs để build html trangchu.ejs ra
});

const tkbhp      = require('./api/api-tkbhp');
const tao_tkbhp  = require('./_tao-tkbhp');
router.use("/tkbhp", tkbhp);
router.use("/tao-tkbhp", tao_tkbhp);
module.exports = router;