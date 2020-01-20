var express = require('express')
var app = express()
var router = express.Router();
var path = require('path')
var main = require('./main/main')
var admenu = require('./admenu/index')
var order = require('./order/index')
var menu_add = require('./menu_add/index')
var cookie = require('./cookie/index')
var cart = require('./cart/index')
var remove = require('./remove/index')
var cart_test = require('./cart_test/index')
var remove_order = require('./remove_order/index')



router.use('/main', main)
router.use('/admenu', admenu)
router.use('/order', order)
router.use('/menu_add', menu_add)
router.use('/cookie', cookie)
router.use('/cart', cart)
router.use('/remove', remove)
router.use('/remove_order', remove_order)
router.use('/cart_test', cart_test)



module.exports = router;
