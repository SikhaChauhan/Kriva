const express = require('express');
const flash = require('connect-flash');
const app = express();
const path = require('path');
const connectDb = require('./config/db'); 
const cors = require('cors');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const adminRoute = require('./routes/adminRoute');
const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');
const indexRoute = require('./routes/indexRoute');
require('dotenv').config();


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(
    expressSession({
        resave: false,
        saveUninitialized: false,
        secret: process.env.EXPRESS_SESSION_SECRET,
        cookie: {
            secure: true,
            httpOnly: true,
            sameSite: 'None', 
        },
    })
);


app.use(flash());
app.use(express.static(path.join(__dirname,'public')));
app.set('view engine', 'ejs');

app.use(cors({
    origin: 'http://localhost:1860', // Adjust this according to your frontend URL
    credentials: true,  // Enable cookies to be sent with requests
}));


app.use('/', indexRoute);
app.use('/admin', adminRoute);
app.use('/users', userRoute);
app.use('/products', productRoute);


app.listen(1860,(req,res)=>{
    console.log('Server successfully starting at http://localhost:1860');
});