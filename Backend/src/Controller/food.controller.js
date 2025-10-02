const foodModel = require('../models/food.model');
const storageService = require('../services/storage.service')
const {v4:uuid}=require('uuid');
async function createfood(req,res) {
    


    const fileUploadResult = await storageService.uploadFile(req.file.buffer,uuid())
    const foodItem = await foodModel.create({
        name:req.body.name,
        description:req.body.description,
        video:fileUploadResult.url,
        foodPartner:req.foodPartner._id
    })

    res.status(201).json({
        message:"Food Created SucessFully",
        food:foodItem
    })

}

module.exports={
    createfood,
}