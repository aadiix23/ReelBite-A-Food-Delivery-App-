const express =require("express");
const authController=require("../Controller/auth.controller")
const router =express.Router();
//auth user
router.post('/user/register',authController.registerdUser);
router.post('/user/login',authController.loginuser);
router.get('/user/logout',authController.logoutuser);
//auth foodpartner
router.post('/food-partner/register',authController.registerFoodPartner)
router.post('/food-partner/login',authController.loginfoodPartner)
router.get('/food-partner/logout',authController.logoutFoodPartner)

module.exports=router;