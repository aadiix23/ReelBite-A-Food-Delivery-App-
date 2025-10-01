const mongoose=require('mongoose')
const foodpartnerschema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,

    }
},{
    timestamps:true
})

const foodPartnerModel =mongoose.model("foodpartner",foodpartnerschema);

module.exports=foodPartnerModel;