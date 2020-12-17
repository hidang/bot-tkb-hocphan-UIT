const express = require('express');
const router_soan_tkbhp = express.Router();

router_soan_tkbhp.get('/', (req, res) => {
  res.render('pages/soan-tkbhp');
});


module.exports = router_soan_tkbhp;