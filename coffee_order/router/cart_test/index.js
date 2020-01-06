var express = require('express')
var app = express()
var router = express.Router();
var path = require('path');
var cookieParser = require('cookie-parser');
router.use(cookieParser());

var menu = {
    1:{title : '아메리카노', price : '4000'},
    2:{title : '스무디' ,  price : '5000'}
};

router.get('/', function(req, res) {
    var cart = req.cookies.cart;
    var amount = 0;
    if(!cart) {
        res.send('비어있습니다.');
    } else {
        var output = '';
        for(var id in cart) {
            output += `<li>${menu[id].title} : ${cart[id]} 개 주문 // 가격 : ${menu[id].price*(cart[id])}</li>`
        }
        for(var id in cart) {
            amount += (menu[id].price)*(cart[id]);
        }
    }
    res.send(`<h1>Cart</h1>
        <ul>${output}</ul>
        <ul>총 합계 : ${amount}</ul>
        <a href="/order">Orders List</a><br>
        <a href="/remove">주문 하기</a>`
        )
})


module.exports = router;
