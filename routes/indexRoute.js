const express = require('express');
const router = express.Router();
const isLoggedIn = require('')

router.get('/', (req,res)=>{
    let err = req.flash("error");
    res.render('index', {err});
});

module.exports = router;