const express = require('express');
const app = express();
const path = require('path');



app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname,'public')));
app.set('view engine', 'ejs');

app.get('/', (req,res)=>{
    res.send('hii');
});

app.listen(1860,(req,res)=>{
    console.log('Server successfully starting at http://localhost:1860');
});