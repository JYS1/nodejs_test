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
    database : 'coffee',
    dateStrings: 'date' // 날짜가 이상하게 나올때 재대로 보이게 하는 방법.
})

connection.connect();

router.get('/list', function(req, res) {
    res.render('menu_add.ejs')
})

router.get('/', function(req,res) {
    var responseData = {}

    var query = connection.query('select * from corder', function(err, rows) {
       if(err) throw err;
       if(rows.length) {
           responseData.result = 1;
           responseData.data = rows;
       } else {
           responseData.result = 0;
       }
       res.json(responseData)
   })
})



module.exports = router;
