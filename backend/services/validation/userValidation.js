const { check } = require('express-validator');
const User = require('../../sequelize/models/user');
const bcrypt = require('bcrypt');
const { body } = require("express-validator");

const userLoginValidation = [
    check('email','You provided Invalid Email').not().notEmpty().isEmail().custom((value, {req})=>{
        if(!value) return false;
        return new Promise((resolve,reject)=>{
            User.findOne({
                where:{
                    email:req.body.email
                }
            })
            .then((result)=>{
                if(!result){
                    return reject(new Error("Email not found"))
                }else{
                    return resolve(true)
                }
            }).catch(()=>{
                return reject(new Error("Internal Server Error"))
            })
        })
    }),
    check('password', 'Invalid Password').not().notEmpty().isLength({ min:4, max:10}).custom((value, {req})=>{
        if(!value) return false;
        return new Promise(async (resolve,reject)=>{
            const userPassword = await User.findOne({
                where:{
                    email:req.body.email
                },
                attributes:["password"],
                raw:true
            });
            if(!userPassword){
                return reject(false)
            }

            const isOkPassword = await bcrypt.compare(
                req.body.password,
                userPassword.password
            )
            if(isOkPassword){
                return resolve(true)
            }else{
                return reject(new Error("Invalid Password"))
            }
        })
    })
]

const validateUserRegistration = [
    body("firstName")
        .trim()
        .notEmpty()
        .withMessage("First name is required")
        .isLength({ min: 2 })
        .withMessage("First name must be at least 2 characters long"),

    body("lastName")
        .trim()
        .notEmpty()
        .withMessage("Last name is required")
        .isLength({ min: 2 })
        .withMessage("Last name must be at least 2 characters long"),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email format"),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
];


module.exports = { userLoginValidation,validateUserRegistration };