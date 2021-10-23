const express = require('express');
const Users = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');



//create user api
router.post('/createuser',
       [body('name', 'Enter a valid Name').isLength({ min: 3 }),
       body('email', 'Enter a valid email').isEmail(),
       body('address','Enter a valid Address').isLength({min : 5}),
       body('password','Enter a valid Password Min Length 8 Required').isLength({min : 8}),
       body('city','Enter a valid city').isLength({min : 1}),
    ],
async(req,res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ error: errors.array() });
    }


    try{
        let checkuser = await Users.findOne({ email: req.body.email }).exec();
        if (checkuser) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" })
        }
        else{
            return res.status(200).json({error : 'OK'});
        }


    }
    catch(err){
        return res.status(500).json({error : 'Internal Server Error !'});
    }
});


module.exports = router