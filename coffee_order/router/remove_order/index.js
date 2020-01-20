var express = require('express')
var app = express()
var router = express.Router();
var path = require('path');
var cookieParser = require('cookie-parser');
router.use(cookieParser());

router.get('/', function(req,res) {
    var cart = req.cookies.cart;
    res.clearCookie('cart');
    res.redirect('/cookie');
});

module.exports = router;
