const mongoose = require('mongoose');
const clientSchema = new mongoose.Schema(
    {
        fullname:{type: String , required: true},
        email:{type: String , required: true, unique: true},
        phonenumber: { type: Number, required: true,unique: true},
        address: {type:String,required:true}        
    },
    {timestamps:true}
);



module.exports = mongoose.model("Client",clientSchema);