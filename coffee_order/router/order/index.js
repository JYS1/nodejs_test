var express = require('express')
var app = express()
var router = express.Router();
var path = require('path')

var menu = {
    1:{title : '아메리카노'},
    2:{title : '스무디'}
};

router.get('/', function(req, res) {
    res.render('order.ejs')
})


router.get('/:id', function(req,res) {
    var id = req.params.id;
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
    res.redirect('/order');
});

module.exports = router;
