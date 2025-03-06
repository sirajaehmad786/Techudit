var express = require('express');
var router = express.Router();
const userController = require('../controller/user');
const { userLoginValidation,validateUserRegistration } = require('../../services/validation/userValidation');
const bodyErrorSender = require('../../middleware/bodyErrorSender');

router.post('/user-register', validateUserRegistration,bodyErrorSender,userController.userRegister)
router.post('/admin-register',validateUserRegistration,bodyErrorSender, userController.adminUser)
router.post('/admin-login',userLoginValidation,bodyErrorSender, userController.adminLogin)
router.get("/verify-email", userController.verifyEmail);


module.exports = router;