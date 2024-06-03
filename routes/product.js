const router = require('express').Router();
const Product = require("../models/Product");
const { tokenVerify,verifyAdmin,verifyTokenAndAuth } = require('../middleware/tokenVerify');
const upload = require('../middleware/upload');

// Create product
router.post('/add',verifyAdmin,async(req,res)=>{

    const newProduct = new Product(req.body);
    try{
        
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    }
    catch(err){
        res.status(500).json(err);
    }
})


// Update product
router.post('/update/:id',verifyAdmin,async(req,res)=>{
   
    try{
        
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        res.status(200).json(updatedProduct);
    }
    catch(err){
        res.status(500).json(err);
    }
})

// Delete product
router.delete('/remove/:id',verifyAdmin,async(req,res)=>{
    try{
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json('Deleted')
    }
    catch(err){
        res.status(500).json(err);
    }
})

// Show product
router.get('/product/:id',async(req,res)=>{
    try{
        const product = await Product.findById(req.params.id);
        const {title, ...others} = product._doc;
        res.status(200).json(...others)
    }
    catch(err){
        res.status(500).json(err);
    }
})


// Get all products
router.get('/all',async(req,res)=>{
    try{
        let products;
        products = await Product.find().sort({createdAt: -1});
        res.status(200).json(products)
    }
    catch(err){
        res.status(500).json(err);
    }
})

module.exports = router