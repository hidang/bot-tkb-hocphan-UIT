const express = require('express');
const router = express.Router();
// router.set("view engine", "ejs");router.set("views", "./views");//error vì lúc này đang là router của app(server.js)
router.get("/", (req, res) => {  // <=> router.get('/', function(req, res){
  //res.send("Home page. Server chạy ngon lành cành đào");//ở đây sẽ chèn html vào để chạy web
  res.render("pages/trangchu"); //dùng farmework ejs để build html trangchu.ejs ra
});

const tkbhp = require('./api/api-tkbhp.js');
const tao_tkbhp = require('./_tao-tkbhp');

router.use("/tkbhp", tkbhp);
router.use("/tao-tkbhp", tao_tkbhp);
module.exports = router;