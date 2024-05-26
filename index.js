const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv'); 
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const clientRoute = require("./routes/client");
const cartRoute = require("./routes/cart");
const productRoute = require("./routes/product");

const cors = require('cors');
app.use(cors());


// Mongodb connection
//mongodb+srv://user1:8Ce57zzZF6Yc5fU7@cluster0.mvsiss1.mongodb.net/

// Connect to mongoose database
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log('Mongodb connected!') )
    .catch((err) => {
        console.log(err);
    });
app.use(express.json());
app.use('/api/auth',authRoute);
app.use('/api/users',userRoute);
app.use('/api/clients',clientRoute);
app.use('/api/products',productRoute);
app.use('/api/cart',cartRoute);


app.get('/api/test',() =>{
    console.log('Test is successfull');
})


module.exports =app
