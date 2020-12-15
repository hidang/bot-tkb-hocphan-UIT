const express = require('express');
const router_tkbhp = express.Router();
const getCodeClass = require('../../controllers/webFunction/getCodeClass');
router_tkbhp.get("/",async (req, res) => {
  //console.log(req.query.username);
  var username = req.query.username;
  var codeclass = await getCodeClass(username);
  if(!codeclass) err = 'Không tìm thấy username trên hệ thống hoặc database server đang bảo trì';
  console.log(codeclass);
  res.render('pages/tkbhp', {
    username: username,
    codeclass: codeclass,
    err: err
  });
});


module.exports = router_tkbhp;