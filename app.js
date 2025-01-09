const express = require('expressconst flash = require('connect-flash');');
const app = express();
const path = require('path');
const connectDb = require('./config/db'); 
const expressSession = require('express-session');



app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(
    expressSession({
        resave: false,
        saveUninitialized: false,
        secret: process.env.EXPRESS_SESSION_SECRET,
    })
);

const adminRoute = require('./routes/adminRoute');
const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');

require('dotenv').config();


app.use(express.static(path.join(__dirname,'public')));
app.set('view engine', 'ejs');

app.use('/admin', adminRoute);
app.use('/user', userRoute);
app.use('/product', productRoute);


app.listen(1860,(req,res)=>{
    console.log('Server successfully starting at http://localhost:1860');
});