
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
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
        fullname:{type: String , required: true},
        email:{type: String , required: true, unique: true},
        phonenumber: { type: Number, required: true,unique: true},
        address: {type: Object,required: true},
        totalPrice:{type: Number},

    },
    {timestamps:true}
)


module.exports = mongoose.model("Order",orderSchema);