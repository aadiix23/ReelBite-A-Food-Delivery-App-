const userModel = require('../models/user.model');
const foodPartnerModel=require('../models/foodpartner.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');


  async function registerdUser(req,res) {
    const{fullname, email,password}=req.body;

    const isUserAlreadyExists =await userModel.findOne({
        email
    })
    if(isUserAlreadyExists){
        return res.status(400).json({
            message:"User Already Exists"
        })
    }


    const hashedPassword=await bcrypt.hash(password,10);

    const user = await userModel.create({
        fullname,
        email,
        password:hashedPassword
    })
    const token=jwt.sign({
        id:user._id,
        
    },process.env.JWT_SECRET)
    res.cookie("token", token, { httpOnly: true });

    res.status(201).json({
        message:"User Registerd Succesfully",
        user: {
            _id:user._id,
            email: user.email,
                fullname:user.fullname

        }
    })
  }


async function loginuser(req,res) {
    const{email,password}=req.body;
    const user = await userModel.findOne({
        email
    })
    if(!user){
        return res.status(400).json({
            message:"Invalid Email Or Password"
        })
    }
    const isPasswordValid = await bcrypt.compare(password,user.password);
    if(!isPasswordValid){
        return res.status(400).json({
            message:"Invalid email or Password"
        })
    }
    const token =jwt.sign({
        id:user._id,
    },process.env.JWT_SECRET)
    res.cookie("token",token)

    res.status(200).json({
        message:"user LOGIN Sucessfully",
        user:{
            _id:user._id,
            email:user.email,
            fullname:user.fullname
        }
    })

    
}

function logoutuser(req,res){
    res.clearCookie("token");
    res.status(200).json({
        message:"User Logout Sucessfully"
    });
}

async function registerFoodPartner(req,res) {
     const{name, email,password}=req.body;
    
      const isAccountAlreadyExists =await foodPartnerModel.findOne({
        email
    })
    if(isAccountAlreadyExists){
        return res.status(400).json({
            message:"foodpartner Already Exists"
        })
    }
    const hashedPassword=await bcrypt.hash(password,10);

    const foodpartner = await foodPartnerModel.create({
        name,
        email,
        password:hashedPassword
    })
    const token=jwt.sign({
        id:foodpartner._id,
        
    },process.env.JWT_SECRET)
    res.cookie("token", token, { httpOnly: true });

    res.status(201).json({
        message:"Food Partner Registerd Succesfully",
        user: {
            _id:foodpartner._id,
            email: foodpartner.email,
                name:foodpartner.name

        }
    })
}
async function loginfoodPartner(req,res) {
    const{email,password}=req.body;
    const foodpartner = await foodPartnerModel.findOne({
        email
    })
    if(!foodpartner){
        return res.status(400).json({
            message:"Invalid Email Or Password"
        })
    }
    const isPasswordValid = await bcrypt.compare(password,foodpartner.password);
    if(!isPasswordValid){
        return res.status(400).json({
            message:"Invalid email or Password"
        })
    }
    const token =jwt.sign({
        id:foodpartner._id,
    },process.env.JWT_SECRET)
    res.cookie("token",token)

    res.status(200).json({
        message:"food partner LOGIN Sucessfully",
        foodpartner:{
            _id:foodpartner._id,
            email:foodpartner.email,
            name:foodpartner.name
        }
    })

    
}

function logoutFoodPartner(req,res){
    res.clearCookie("token");
    res.status(200).json({
        message:"Foodpartner Logout Sucessfully"
    });
}

module.exports={
    registerdUser,
    loginuser,
    logoutuser,
    registerFoodPartner,
    loginfoodPartner,
    logoutFoodPartner
}