const express = require('express');
const router_tkbhp = express.Router();
const getCodeClass = require('../../controllers/webFunction/getCodeClass');
router_tkbhp.get("/",async (req, res) => {
  //console.log(req.query.username);
  var username = req.query.username;
  var codeclass_array = await getCodeClass(username);
  var err = null;
  // if(!codeclass_array) err = 'Không tìm thấy username trên hệ thống hoặc database đang bảo trì';
  
  res.render('pages/tkbhp', {
    username: username,
    codeclass_string: codeclass_array,
  });
});


module.exports = router_tkbhp;