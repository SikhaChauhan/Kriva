const express = require('express');
const router = express.Router();
const adminModel = require('../models/adminModel');





if(process.env.NODE_ENV === "development"){
    router.post('/create', async (req,res)=>{
        let admin = await adminModel.find();
        if(admin.length > 0) {
            return res
                .status(503)
                .send("You don't have permission to create a new admin")
        }

        // let {fullName, email, password, products, picture, gstIn} = req.body;
        let {fullName, email, password} = req.body;
        let createdAdmin = await adminModel.create({
            fullName,
            email,
            password,
            // products,
            // picture,
            // gstIn
        });
        res.status(201).send(createdAdmin);
        // console.log('Received data:', req.body);
    });
}


router.get('/adminPanel', (req,res)=>{
    res.render("createproducts");
});



module.exports = router;