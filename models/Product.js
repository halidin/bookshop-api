
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        title:{tpye: String , required: true, unique: true},
        desc:{type: String , required: true, unique: true},
        img: { type: String, required: true},
        price:{ type: Boolean, default:false},
        
    },
    {timestamps:true}
)


module.exports = mongoose.model("Product",productSchema);