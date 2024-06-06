const mongoose = require('mongoose');


const cartSchema = new mongoose.Schema(
    {
        userId:{type: String , required: true, unique: true},
        products: [
            {
                productId: {type: String,required: true},
                quantity: {type: Number,default:1,required: true},
                price:{ type: Number,required: true},
                title:{type: String,required: true},
                img: { type: String, required: true}
                
            },
        ],
        totalPrice:{ type: Number,required: true},

    },
    {timestamps:true}
)


module.exports = mongoose.model("Cart",cartSchema);