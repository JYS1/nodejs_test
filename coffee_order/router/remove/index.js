var express = require('express')
var app = express()
var router = express.Router();
var path = require('path');
var cookieParser = require('cookie-parser');
router.use(cookieParser());

router.get('/', function(req,res) {
    var cart = req.cookies.cart;
    res.clearCookie('cart');
    res.send(`
        <h2>주문완료</h2>
        <a href="/order">돌아가기</a>
        `)
});

module.exports = router;
