var express = require('express')
var app = express()
var router = express.Router();
var path = require('path');
var cookieParser = require('cookie-parser');
router.use(cookieParser());

var mysql = require('mysql')
var connection = mysql.createConnection({
    host : 'localhost',
    port : '3306',
    user : 'root',
    password : '1234',
    database : 'coffee'
})

connection.connect();

var menu = {
    1:{title : '아메리카노', price : '4000'},
    2:{title : '카페라떼' ,  price : '5000'},
    3:{title : '카라멜마키아또' ,  price : '5000'},
    4:{title : '카푸치노' ,  price : '5000'},
    5:{title : '카페모카' ,  price : '5000'},
    6:{title : '아포가토' ,  price : '5000'},
    7:{title : '아포가토스무디' ,  price : '5000'},
    8:{title : '망고스무디' ,  price : '5000'},
    9:{title : '제주호두당근스무디' ,  price : '5000'},
    10:{title : '딸기요거트' ,  price : '5000'},
    11:{title : '아몬드바나나' ,  price : '5000'},
    12:{title : '말차레모네이드' ,  price : '5000'},
    13:{title : '아이스티' ,  price : '5000'},
    14:{title : '핑크베리' ,  price : '5000'},
    15:{title : '민트블렌드' ,  price : '5000'},
    16:{title : '라임패션티' ,  price : '5000'},
    17:{title : '제주유기녹차' ,  price : '5000'}
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
        <form action="/cart_test" method="post">
            <ul name="content">${output}</ul>
            <ul name="amount">총 합계 : ${amount}</ul>
            <a href="/order">Orders List</a><br>
            <input type="submit" value="주문하기">
        </form>`
        )
})

router.post('/', function(req,res) {
    var content = req.body.content;
    var amount = req.body.amount;

    var sql = {content, amount};
    var query = connection.query('insert into corder set ?', sql, function(err,rows) {
        if(err) throw err
        return res.render('remove')
    })
})

module.exports = router;
