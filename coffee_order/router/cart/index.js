var express = require('express')
var app = express()
var router = express.Router();
var path = require('path');
var cookieParser = require('cookie-parser');
router.use(cookieParser());



router.get('/', function(req, res) {
    var cart = req.cookies.cart;
    if(!cart) {
        res.send('비어있습니다.');
    } else {
        var output = '';
        for(var id in cart) {
            output += `<li>${id} : ${cart[id]} 개 주문</li>`;
        }
    }
    res.send(`<h1>Cart</h1>
        <ul>${output}</ul>
        <a href="/order">Orders List</a><br>
        <a href="/remove">주문 하기</a>`
        )
})


module.exports = router;
