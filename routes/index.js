let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({ data: 'Home test' });
});

module.exports = router;
