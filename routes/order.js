const Order = require('../models/Order');
const router = require('express').Router();
const { verifyAdmin,tokenVerify, verifyTokenAndAuth} = require('../middleware/tokenVerify');



// Create an order
router.post('/order',async(req,res)=>{
    const newOrder = new Order(req.body);
    try{
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder)
    }
    catch(err){
        res.status(500).json(err);
    }
})

// Get all orders from specific customer
router.get('/:id',verifyTokenAndAuth, async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.id });
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get specific order 
router.get('/order/:id',verifyTokenAndAuth, async (req, res) => {
    try {
        const orders = await Order.findById(req.params.id);
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get all orders
router.get('customer/all',verifyAdmin,async (req, res) => {
    try {
        let order;
        order = await Order.find();// Sort by name in ascending order
        res.status(200).json(order);
    } catch (err) {
        res.status(500).json(err);
    }
});




module.exports = router