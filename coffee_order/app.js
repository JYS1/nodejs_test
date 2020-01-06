var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var router = require('./router/index')
var cors =require('cors')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var session = require('express-session')
var flash = require('connect-flash')
var cookieParser = require('cookie-parser');


app.listen(3000, function(){
    console.log("Start! express server on port 3000")
})

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine', 'ejs')
app.use(cors())

app.use(session ({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser());
app.use(flash());


app.use(router)
