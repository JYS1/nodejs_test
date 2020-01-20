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

app.use(express.static('public'))   //public 파일 안에 파일들은 정적으로 사용한다는것.
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true})) //body에 있는 영어 제외한 언어들 + 기호를 인코딩해서 보여지게해주는것.
app.set('view engine', 'ejs')   // view 엔진을 ejs 파일로 한다고 설정
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
