const { verifyAdmin,tokenVerify, verifyTokenAndAuth} = require('../middleware/tokenVerify');
const Cart = require('../models/Cart');

const router = require('express').Router();



// Add item to cart
router.post('/addtocart',verifyTokenAndAuth,async(req,res)=>{
    const newCart = new Cart(req.body);
    try{
        const savedCart = await newCart.save();
        res.status(200).json(savedCart)
    }
    catch(err){
        res.status(500).json(err);
    }
})


// Update cart
router.post('/updatecart/:id',verifyTokenAndAuth,async(req,res)=>{
    
    try{
        
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        res.status(200).json(updatedCart);
    }
    catch(err){
        res.status(500).json(err);
    }
})


// Clear cart
router.delete('/clearcart/:id',verifyTokenAndAuth,async(req,res)=>{
    try{
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json('Deleted')
    }
    catch(err){
        res.status(500).json(err);
    }
})


// Show product
router.get('/:userId',verifyTokenAndAuth,async(req,res)=>{
    try{
        const cart = await Cart.find({userId : req.params.userId});
        res.status(200).json(cart)
    }
    catch(err){
        res.status(500).json(err);
    }
})