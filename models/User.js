const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema(
    {
        username:{type: String , required: true, unique: true},
        email:{type: String , required: true, unique: true},
        password: { type: String, required: true},
        isAdmin:{ type: Boolean, default:false},
        
    },
    {timestamps:true}
);

// // Password hashing using bcrypt
userSchema.pre('save',async function (next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt);
    next();
});


module.exports = mongoose.model("User",userSchema);