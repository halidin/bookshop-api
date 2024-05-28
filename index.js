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
const corsOptions = {
    origin: 'http://localhost:4200', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Authorization,Origin,X-Requested-With,Content-Type,Accept',
};
  
app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
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


app.get('/api/test',() =>{
    console.log('Test is successfull');
})


module.exports =app
