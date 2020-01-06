var express = require('express')
var app = express()
var router = express.Router();
var path = require('path')
var mysql = require('mysql')
var connection = mysql.createConnection({
    host : 'localhost',
    port : '3306',
    user : 'root',
    password : '1234',
    database : 'coffee'
})

connection.connect();

router.get('/', function(req, res) {
    res.render('menu_add.ejs')
})

router.post('/', function(req,res) {
    var num = req.body.num;
    var name = req.body.name;
    var price = req.body.price;

    var sql = {num, name, price};
    var query = connection.query('insert into menu set ?', sql, function(err, rows) {
        if(err) throw err
        return res.render('admenu.ejs')
    })
})



module.exports = router;
