const express =require("express");
const router =express.Router();
const foodController =require('../Controller/food.controller')
const authMiddleware = require('../middleware/auth.middleware')
const multer = require('multer')

const upload =multer({
    storage:multer.memoryStorage(),
})

router.post(
  '/',
  authMiddleware.authFoodPartnerMiddleware,
  upload.single("video"),
  foodController.createfood
)

/* GET /api/food/[protected] */
router.get("/",
    authMiddleware.authUserMiddleware,
    foodController.getFoodItems
)
module.exports=router;