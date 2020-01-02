var express = require('express')
var app = express()
var router = express.Router();
var path = require('path')
var main = require('./main/main')
var admenu = require('./admenu/index')
var order = require('./order/index')

router.use('/main', main)
router.use('/admenu', admenu)
router.use('/order', order)

module.exports = router;
