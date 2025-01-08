const express = require('express');
const app = express();
const path = require('path');
const connectDb = require('./config/db'); 


app.use(express.json());
app.use(express.urlencoded({extended:true}));

const adminRoute = require('./routes/adminRoute');
const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');




app.use(express.static(path.join(__dirname,'public')));
app.set('view engine', 'ejs');

app.use('/admin', adminRoute);
app.use('/user', userRoute);
app.use('/product', productRoute);


app.listen(1860,(req,res)=>{
    console.log('Server successfully starting at http://localhost:1860');
});