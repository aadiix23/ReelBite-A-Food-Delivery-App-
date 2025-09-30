const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs')
  async function registerdUser(req,res) {
    const{fullname, email,password}=req.body;

    const isUserAlreadyExists =await userModel.findone({
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
  }