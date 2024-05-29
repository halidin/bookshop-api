const { verifyAdmin } = require('../middleware/tokenVerify');
const Client = require("../models/Client");

const router = require('express').Router();

router.get('/clientTest',(req,res) =>{
    res.send('user test successfull')
})

router.post('/userposttest',(req,res) =>{
    const username = req.body.username;
    console.log(username);
})

// Add new client to the database
router.post('/addnew',verifyAdmin,async (req,res)=> {
    const newClient = new Client({
        fullname: req.body.fullname,
        email:req.body.email,
        phonenumber: req.body.phonenumber,
        address: req.body.address
    });

    try {
        const savedClient = await newClient.save();
        res.status(200).json(savedClient);
    } catch(err){
        res.status(500).json(err);
    }
});

// Show client by id
router.get('/client/:id',verifyAdmin,async(req,res)=>{
    try{
        const client = await Client.findById(req.params.id);
        const {password, ...others} = user._doc;
        res.status(200).json(client)
    }
    catch(err){
        res.status(500).json(err);
    }
})

// Remove client by id
router.delete('/remove/:id',verifyAdmin,async(req,res)=>{
    try{
        const client = await Client.findByIdAndDelete(req.params.id);
        const {password, ...others} = user._doc;
        res.status(200).json(client)
    }
    catch(err){
        res.status(500).json(err);
    }
})

// Get all clients
router.get('/all', verifyAdmin,async (req, res) => {
    try {
        let client;
        client = await Client.find().sort({ name: 1 }); // Sort by name in ascending order
        res.status(200).json(customers);
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router