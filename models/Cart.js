const mongoose = require('mongoose');


const cartSchema = new mongoose.Schema(
    {
        userId:{type: String , required: true, unique: true},
        products: [
            {
                productId: {type: String,},
                quantity: {type: Number,default:1,},
                price:{ type: Number},
                title:{type: String},
                img: { type: String, required: true}
                
            },
        ],
        totalPrice:{ type: Number},

    },
    {timestamps:true}
)


module.exports = mongoose.model("Cart",cartSchema);