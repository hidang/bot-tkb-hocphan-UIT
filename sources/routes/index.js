const express = require('express');
const router = express.Router();
// router.set("view engine", "ejs");router.set("views", "./views");//error vì lúc này đang là router của app(server.js)
router.get("/", (req, res) => {  // <=> router.get('/', function(req, res){
  //res.send("Home page. Server chạy ngon lành cành đào");//ở đây sẽ chèn html vào để chạy web
  res.render("trangchu"); //dùng farmework ejs để build html trangchu.ejs ra
});

module.exports = router;