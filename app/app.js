"use strict";

// 모듈
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');               // morgan 로그 확인 용이
const path = require('path');
const session = require('express-session');
const dotenv = require('dotenv');               // .env -> process.env  
const passport = require('passport');           // 인증 관련

dotenv.config()
// 라우팅
const pageRouter = require('./src/routes/page');    // 화면 랜더 (아직 안함)
const authRouter = require('./src/routes/auth');    // 로그인 회원가입 로그아웃 탈퇴 .
const homeRouter = require('./src/routes/home');    // 로그인 후 메인 화면
const {sequelize} = require('./src/models')         // 분해 할당함
const passportConfig = require('./src/passport')

const app = express();
//passportConfig();         // 패스포트 설정

// 앱 세팅
app.set('views', './src/views');
app.set('view engine', 'ejs');

// 모델과 서버 연결 @@@ 0924 모델 생성 x 상태
// sequelize.sync({force:false})       // 애플리케이션을 시작할 때(마다) DB 재생성 여부 결정
//     .then(() => {
//         console.log('DB 연결 성공');
//     })
//     .catch((err) => {
//         console.error(err);
//     });

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));    // public 경로
app.use(express.json());                                    // JSON 과
app.use(express.urlencoded({ extended: false }));           // URL 스트림 처리 -> req.body에 추가
app.use(cookieParser(process.env.COOKIE_SECRET));           // 요청에 쿠키 해석 -> req.cookies 객체로 만듦
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,            // 배포시 https 적용하고 secure true 할 것
    }
}))
app.use(passport.initialize());     // 미들웨어: req 객체에 passport 설정 심고
app.use(passport.session());        // 미들웨어: req.session 객제에 passport 정보 저장

app.use('')
app.use('/home', homeRouter);       // use -> middleware를 등록해주는 메서드
app.use('/auth', authRouter); 

module.exports = app;

