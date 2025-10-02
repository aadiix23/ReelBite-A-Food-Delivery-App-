const foodModel = require('../models/food.model');
const storageService = require('../services/storage.service');
const { v4: uuid } = require('uuid');

async function createfood(req, res) {
    try {
    
        console.log("req.file:", req.file);
        console.log("req.body:", req.body);

       
        if (!req.file) {
            return res.status(400).json({ message: "Video file is required" });
        }

       
        const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid());

        
        const foodItem = await foodModel.create({
            name: req.body.name,
            description: req.body.description,
            video: fileUploadResult.url,
            foodPartner: req.foodPartner._id
        });

        res.status(201).json({
            message: "Food Created Successfully",
            food: foodItem
        });
    } catch (error) {
        console.error("Error in createfood:", error);
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
}

async function getFoodItems(req, res) {
    try {
        const foodItems = await foodModel.find({});
        res.status(200).json({
            message: "Food items fetched successfully",
            foodItems
        });
    } catch (error) {
        console.error("Error in getFoodItems:", error);
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
}

module.exports = {
    createfood,
    getFoodItems
};
