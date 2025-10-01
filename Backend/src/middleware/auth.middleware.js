const foodPartnerModel=require('../models/foodpartner.model')
const jwt = require('jsonwebtoken');
async function authFoodPartnerMiddleware(req,res,next) {
const token = req.cookies.token;
if(!token){
   return res.status(401).json({
        message:"Please You Need To Login First"
    })
}  
try {
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    const foosPartner=await foodPartnerModel.findById(decoded.id);
    req.foosPartner=foosPartner
    next()
} catch (err) {
    return res.status(401).json({
        message:"Invalid Token"
    })
}  

}

module.exports={
    authFoodPartnerMiddleware, 
}