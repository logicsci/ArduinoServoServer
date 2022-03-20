const express = require('express')
const router = express.Router()

router.get('/', function(req, res, next) {
    res.send({ message: 'api root'});
});

router.use('/clients', require('./clients'));

module.exports = router
