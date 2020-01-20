var express = require('express')
var app = express()
var router = express.Router();
var path = require('path');
var cookieParser = require('cookie-parser');
router.use(cookieParser());



router.get('/', function(req, res) {
    var cart = req.cookies.cart;
    var count = req.cookies.amount;

    var amount = 0;

    if(!cart) {
        res.send('비어있습니다.');
    } else {
        var output = '';
        var content = '';
        for(var id in cart) {
            output += `<li>${id} : ${cart[id]} 개 주문 가격 : ${count[id]*(cart[id])} 원</li>`;
        }

        for(var id in cart) {
            amount += (count[id])*(cart[id]);
        }
        for(var id in cart) {
            content += `${id}:${cart[id]}개/`
        }
    }
    res.send(`<h1>Cart</h1>
        <form action="/cart" method="post">
            <ul>${output}</ul>
            <ul>${amount} 원</ul>
            <input type="hidden" name="content" value="${content}">
            <input type="hidden" name="amount" value="${amount}">
            <a href="/order">Orders List</a><br>
            <input type="submit" value="주문하기">
        </form>`
        )
        router.post('/', function(req,res) {
            var content = req.body.content;
            var amount = req.body.amount;

            var sql = {content, amount};
            var query = connection.query('insert into corder set ?', sql, function(err,rows) {
                var cart = req.cookies.cart;
                res.clearCookie('cart');
                res.clearCookie('amount');
                res.send(`
                    <h2>주문완료</h2>
                    <a href="/order">돌아가기</a>
                    `)
            })
        })


})


module.exports = router;
