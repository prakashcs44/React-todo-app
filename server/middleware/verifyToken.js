const jwt = require("jsonwebtoken");
const secretKey = "erjnrfjknoiffojiqwdnwejnvkwjvn dkjv wek";


const verifyToken = (req,res,next)=>{
  
  const token  = req.headers.authorization?.split(" ")[1];
  if(!token){
    return res.status(400).json({message:"No token provided"});
  }
  jwt.verify(token,secretKey,(err,decoded)=>{
    if(err){
       return res.status(400).json({message:"Failed to authenticate token"})
    }
    req.user = decoded;
    next();
  })

};

module.exports = verifyToken;