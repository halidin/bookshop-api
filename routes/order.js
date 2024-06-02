const Order = require('../models/Cart');

const router = require('express').Router();



// Create an order
router.post('/order',async(req,res)=>{
    const newOrder = new newOrder(req.body);
    try{
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder)
    }
    catch(err){
        res.status(500).json(err);
    }
})



// Get all orders
router.get('/all',async (req, res) => {
    try {
        let order;
        order = await Order.find().sort({createdAt: -1});// Sort by name in ascending order
        res.status(200).json(order);
    } catch (err) {
        res.status(500).json(err);
    }
});
module.exports = router