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
    3:{title : '카라멜마키아또' ,  price : '4500'},
    4:{title : '카푸치노' ,  price : '5500'},
    5:{title : '카페모카' ,  price : '5000'},
    6:{title : '아포가토' ,  price : '6000'},
    7:{title : '아포가토스무디' ,  price : '6000'},
    8:{title : '망고스무디' ,  price : '6700'},
    9:{title : '제주호두당근스무디' ,  price : '5000'},
    10:{title : '딸기요거트' ,  price : '5500'},
    11:{title : '아몬드바나나' ,  price : '6500'},
    12:{title : '말차레모네이드' ,  price : '5000'},
    13:{title : '아이스티' ,  price : '5000'},
    14:{title : '핑크베리' ,  price : '6000'},
    15:{title : '민트블렌드' ,  price : '7000'},
    16:{title : '라임패션티' ,  price : '5500'},
    17:{title : '제주유기녹차' ,  price : '6000'}
};

router.get('/', function(req, res) {
    var cart = req.cookies.cart;
    var amount = 0;
    if(!cart) {
        res.send('비어있습니다.');
    } else {
        var output = '';
        var content ='';
        for(var id in cart) {
            output += `<li>${menu[id].title} : ${cart[id]} 개 주문 // 가격 : ${menu[id].price*(cart[id])}</li>`
        }
        for(var id in cart) {
            amount += (menu[id].price)*(cart[id]);
        }
        for(var id in cart) {
            content += `${menu[id].title}:${cart[id]}개/`
        }
    }
    res.send(`<h1>Cart</h1>
        <form action="/cart_test" method="post">
            <ul>${output}</ul>
            <ul>총 합계 : ${amount}</ul>
            <input type="hidden" name="content" value="${content}">
            <input type="hidden" name="amount" value="${amount}">   //시간은 default 값이라 안 넣어 준다.
            <input type="button"  onclick="location.href='/cookie'" value="주문 더하기"><br>
            <input type="submit" value="주문하기">
        </form>`
        )
})

router.post('/', function(req,res) {
    var content = req.body.content;
    var amount = req.body.amount;

    var sql = {content, amount};
    var query = connection.query('insert into corder set ?', sql, function(err,rows) {
        var cart = req.cookies.cart;
        res.clearCookie('cart');
        res.send(`
            <h2>주문완료</h2>
            <a>주문완료 ! 3초후 자동으로 돌아갑니다.</>
            <body onload="javascript:window_onload()">  <!-- body에 onload를 이용, 페이지 load 후 스크립트 함수를 호출-->
            <script language="javascript">
              function window_onload(){
                 setTimeout('go_url()',3000)  // 3초후 go_url() 함수를 호출한다.
              }
              function go_url(){
                 location.href="/cookie"
              }
            </script>
            `)
    })
})

module.exports = router;
