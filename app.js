const express = require('express');
const flash = require('connect-flash');
const app = express();
const path = require('path');
const connectDb = require('./config/db'); 
const expressSession = require('express-session');
const adminRoute = require('./routes/adminRoute');
const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');
const indexRoute = require('./routes/indexRoute');
require('dotenv').config();


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(
    expressSession({
        resave: false,
        saveUninitialized: false,
        secret: process.env.EXPRESS_SESSION_SECRET,
    })
);


app.use(flash());
app.use(express.static(path.join(__dirname,'public')));
app.set('view engine', 'ejs');

app.use('/', indexRoute);
app.use('/admin', adminRoute);
app.use('/user', userRoute);
app.use('/product', productRoute);


app.listen(1860,(req,res)=>{
    console.log('Server successfully starting at http://localhost:1860');
});