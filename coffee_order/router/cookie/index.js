var express = require('express')
var app = express()
var router = express.Router();
var path = require('path');
var cookieParser = require('cookie-parser');
router.use(cookieParser());

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


router.get('/', function(req,res) {
    var output='<link rel="stylesheet" href="/css/style.css">';
    for(var name in menu) {
        output += `<li>
        <img src="coffee_image/${menu[name].title}.jpg"  class="image"><br>
        ${menu[name].title} / <input type="button" value="+" ${menu[name].title}.jpg" onclick="location.href='/cookie/${name}/${menu[name].price}'">
        </li>`
    }
    res.send(`
        <h1>Orders</h1>
        <ul>${output}</ul>
        <a href="/cart_test">Cart</a>
        `);
});


router.get('/:id/:price', function(req,res) {
    var id = req.params.id;
    var price = req.params.price;

    if(req.cookies.cart) {
        var cart = req.cookies.cart;
    } else {
        var cart = {};
}



if(!cart[id]) {
    cart[id] = 0;
}
    cart[id] = parseInt(cart[id]) + 1;

    res.cookie('cart', cart);
    res.redirect('/cookie');
});



module.exports = router;
