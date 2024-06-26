const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv'); 
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const clientRoute = require("./routes/client");
const cartRoute = require("./routes/cart");
const productRoute = require("./routes/product");
const orderRoute = require("./routes/order");

const cors = require('cors');
const corsOptions = {
    origin: ['http://localhost:4200', 'https://bookstore-angularapp.vercel.app'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};
  
app.use(cors(corsOptions));

app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
});

app.options('/*', (_, res) => {
    res.sendStatus(200);
});




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
app.use('/api/orders',orderRoute);

app.get('/api/test',() =>{
    console.log('Test is successfull');
})


module.exports =app
