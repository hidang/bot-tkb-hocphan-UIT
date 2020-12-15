const express = require('express');
const router_tao_tkbhp = express.Router();

router_tao_tkbhp.get('/',async (req, res) => {
  res.render('pages/tao-tkbhp');
});


module.exports = router_tao_tkbhp;