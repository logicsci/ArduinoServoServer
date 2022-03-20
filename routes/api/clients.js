var express = require('express');
var router = express.Router();
const { getConnectionMap, flush } = require('../../websocket/websocket');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(getConnectionMap());
});

router.get('/flush', function(req, res, next) {
  console.log('flush ', req.query.userId);
  res.send('flush result ' + (flush(req.query.userId) ? 'success' : 'failed'));
});

module.exports = router;
