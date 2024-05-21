const { verifyAdmin } = require('../middleware/tokenVerify');
const User = require("../models/User");

const router = require('express').Router();

router.get('/usertest',(req,res) =>{
    res.send('user test successfull')
})

router.post('/userposttest',(req,res) =>{
    const username = req.body.username;
    console.log(username);
})


router.get('/find/:id',verifyAdmin,async(req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        const {password, ...others} = user._doc;
        res.status(200).json(user)
    }
    catch(err){
        res.status(500).json(err);
    }
})


module.exports = router