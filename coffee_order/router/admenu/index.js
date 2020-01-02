var express = require('express')
var app = express()
var router = express.Router();
var path = require('path')


router.get('/', function(req, res) {
    res.render('admenu.ejs')
})

module.exports = router;
