const router = require('express').Router();
const User  = require('../models/User');
const bcrypt = require('bcrypt');
const { verify } = require('crypto');
const jwt = require('jsonwebtoken');
const { verifyAdmin,tokenVerify } = require('../middleware/tokenVerify');

router.post('/register',async (req,res)=> {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    try {
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch(err){
        res.status(500).json(err);
    }
});

// User login 
router.post('/login',async (req,res)=> {

    try {
        const user = await User.findOne({username: req.body.username})
        if(!user)
            {   

                res.status(401).json("Wrong username")
                return
            }
        
        const passwordCheck = await bcrypt.compare(req.body.password,user.password)
        if(!passwordCheck)
            {
                res.status(401).json("Wrong password")
                return
            }
        // Generating access token
        const accessToken = jwt.sign({
            id:user._id,
            isAdmin:user.isAdmin
        },process.env.JWT_KEY,{expiresIn:'1d'});

        res.status(200).json({user,accessToken});
    } catch(err){
        res.status(500).json(err);
    }
});




module.exports = router 