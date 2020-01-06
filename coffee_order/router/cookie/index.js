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


router.get('/', function(req,res) {
    var output='';
    for(var name in menu) {
        output += `<li>
        ${menu[name].title} / <input type="button" value="+" onclick="location.href='/cookie/${name}/${menu[name].price}'">
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
