var express = require('express')
var app = express()
var router = express.Router();
var path = require('path')
var cookieParser = require('cookie-parser');
app.use(cookieParser())

var order = {
    1:{title : '아메리카노'},
    2:{title : '스무디'}
};

app.get('/orders', function(req,res) {
    for(var name in products) {
        console.log(orders[name]);
    }
    res.send('Order');
});

router.get('/', function(req, res) {
    res.render('admenu.ejs')
})

module.exports = router;
