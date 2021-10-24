const express = require('express');
const Users = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');



//create user api
router.post('/createuser',
    [body('name', 'Enter a valid Name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('address', 'Enter a valid Address').isLength({ min: 5 }),
    body('password', 'Enter a valid Password Min Length 8 Required').isLength({ min: 8 }),
    body('city', 'Enter a valid city').isLength({ min: 1 }),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }


        try {
            let checkuser = await Users.findOne({ email: req.body.email }).exec();
            if (checkuser) {
                return res.status(400).json({ error: "Sorry a user with this email already exists" })
            }

            let salt = await bcrypt.genSaltSync(10);
            let secPass = await bcrypt.hash(req.body.password, salt);

            let user = await Users.create({
                ...req.body,
                password: secPass,
            });

            return res.status(200).json({ 'error': 'OK' });
        }
        catch (err) {
            return res.status(500).json({ error: 'Internal Server Error !' });
        }
    });


router.get('/getusers', async (req, res) => {

    try {
        let userlist = await Users.find({});
        return res.status(200).json({ 'error': 'OK', 'users': JSON.stringify(userlist) });
    }
    catch (err) {
        return res.status(500).json({ 'error': 'Internal Server Error !' });
    }
});


router.post('/getuser', [
    body('id', 'Invaid Information !').not().isEmpty()
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 'error': errors.array() });
    }
    try {
        let user = await Users.findOne({ '_id': req.body.id }).exec();
        if (user) {
            res.status(200).json({ 'error': 'OK', 'message': 'Successfully Found User', 'user': JSON.stringify(user) })
        }
        else {
            res.status(400).json({ 'error': 'User Not Found !' });
        }
    }
    catch (err) {
        res.status(500).json({ 'error': err.message });
    }
});


router.post('/updateuser', [
    body('_id', 'Invalid request Send ').not().isEmpty(),
    body('name', 'Enter a valid Name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('address', 'Enter a valid Address').isLength({ min: 5 }),
    body('password', 'Enter a valid Password Min Length 8 Required').isLength({ min: 8 }),
    body('city', 'Enter a valid city').not().isEmpty(),
], async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(200).json({ 'error': errors.errors[0].msg });
    }

    try {

        let checkuser = await Users.findOne({ email: req.body.email });
        if (!checkuser) {
            return res.status(200).json({ 'error': 'user not found' });
        }

        let checkpass = await bcrypt.compare(req.body.password, checkuser.password);
        if (checkpass) {
            delete req.body.password;
            let update = await Users.findOneAndUpdate({ 'email': req.body.email }, req.body);
            if (update) {
                return res.status(200).json({ 'error': 'OK' });
            } else {
                return res.status(200).json({ 'error': 'Something Went Wrong' });
            }
        }
        else {
            return res.status(200).json({ 'error': 'Invalid Password Enter' });
        }
    }
    catch (err) {
        return res.status(200).json({ 'error': err.message });
    }
});


router.post('/deleteuser', [
    body('email', 'Invalid Request Send').not().isEmpty()
], async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(200).json({ 'error': errors.errors[0].msg });
        }

        let checkuser = await Users.findOne({ 'email': req.body.email }).exec();
        if (!checkuser) {
            return res.status(200).json({ 'error': 'User Not Found !' });
        }

        let deleteuser = await Users.deleteOne({ 'email': req.body.email }).exec();

        if (deleteuser) {
            return res.status(200).json({ 'error': 'OK' });
        }
        else {
            return res.status(200).json({ 'error': 'Something Went Wrong' });
        }
    }
    catch(err){
        return res.status(200).json({ 'error': err.message });
    }
});


module.exports = router