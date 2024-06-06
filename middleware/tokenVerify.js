const jwt = require('jsonwebtoken');


const tokenVerify = (req,res,next)=>{
    const authHeader = req.header('Authorization').replace('Bearer ','');
    
    if(authHeader){
        jwt.verify(authHeader,process.env.JWT_KEY,(err,user)=>{
            if(err){
                res.status(403).json('Token not valid');
            }
            req.user = user;
            next();
        });
    }
    else
    {
        return res.status(401).json('You are not authenticated');
    }

}

const verifyTokenAndAuth = (req,res,next) => {
    tokenVerify(req,res,()=>
    {
        if(req.user._id == req.param._id || req.user.isAdmin){
                next();
            
        }
        else{
            res.status(403).json('Not allowed')

        }
    })
}

const verifyAdmin = (req,res,next) => {
    tokenVerify(req,res,()=>
    {
        if(req.user.isAdmin){
                next();
        }
        else{
            res.status(403).json('Not allowed')

        }
    })
}



module.exports = {tokenVerify,verifyTokenAndAuth,verifyAdmin};