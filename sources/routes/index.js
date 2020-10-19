const express = require('express');

const router = express.Router();
// router.set("view engine", "ejs");//error
// router.set("views", "./views");
router.get("/", (req, res) => {  // <=> app.get('/', function(req, res){
  //res.send("Home page. Server chạy ngon lành cành đào");//thường ở đây sẽ chèn html vào để chạy web
  res.render("trangchu"); //dùng farmework ejs để build html trangchu.ejs ra
});

module.exports = router;