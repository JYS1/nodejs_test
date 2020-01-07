var express = require('express')
var app = express()
var router = express.Router();
var path = require('path')



router.get('/', function(req, res) {
    res.render('order.ejs')
})


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
    res.redirect('/order');

});

module.exports = router;
