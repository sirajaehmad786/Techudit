const User = require('../../sequelize/models/user');
const jwt = require('jsonwebtoken');
const { sendVerificationEmail } = require('../../services/emailService/emailService');

exports.userRegister = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).json({status:false, message: "Email already exists" });
        }

        const user = await User.create({
            firstName,
            lastName,
            email,
            password,
            role: "user" ,
            // verificationToken  
        });
        const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });

        await sendVerificationEmail(email, token);

        return res.status(201).send({
            success: true,
            message: "User registered successfully",
            data: user
        });
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: "User Not Created",
            error: error.message || error
        });
    }
};

exports.adminUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        const existingAdmin = await User.findOne({ where: { email } });

        if (existingAdmin) {
            return res.status(400).json({ status:false, message: "Email already exists" });
        }

        const admin = await User.create({
            firstName,
            lastName,
            email,
            password,
            role: "admin",
            // verificationToken
        });
        const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });

        await sendVerificationEmail(email, token);

        return res.status(201).send({
            success: true,
            message: "Admin registered successfully",
            data: admin
        });
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: "Admin Not Created",
            error: error.message || error
        });
    }
};

exports.adminLogin = async(req,res)=>{
    try {
        const {email} = req.body
        const userData = await User.findOne({
            where:{
                email,
            },
            attributes: {
                exclude: ["password", "token"],
            },
            raw: true,
        })
        if (userData.role !== "admin") {
            return res.status(403).send({
                success: false,
                message: "You are not allowed to login from here",
            });
        }

        if (userData.status == "deactive") {
            return res.status(403).send({
                success: false,
                message: "You are email not verified",
            });
        }

        const token = jwt.sign(userData, process.env.JWT_SECRET_KEY, {
            expiresIn: "24h"
        })
        User.update(
            {
                token
            },
            {
                where:{
                    email
                }
            }
        ).then(()=>{
            return res.status(200).send({
                success: true,
                message: "Admin logged in successfully",
                data: {
                  ...userData,
                  token,
                },
            });
        })
        .catch(() => {
            return res.status(200).send({
              success: false,
              message: "Admin not logged in",
            });
          });
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: "Admin Not Login",
            error: error.message || error
        });
    }
}

exports.verifyEmail = async (req, res) => {
    try {
        const { token } = req.query;
        if (!token) return res.status(400).json({ message: "Token is missing" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const { email } = decoded;

        const user = await User.findOne({ where: { email } });

        if (!user) return res.status(404).json({ message: "User not found" });

        // Ensure status is treated as an array (if required)
        const statusArray = [user.dataValues.status];

        if (statusArray.includes("active")) {
            return res.status(200).json({ message: "Email already verified." });
        }

        // Update user status to active
        await User.update({ status: "active" }, { where: { email } });

        res.status(200).json({ message: "Email verified successfully!" });

    } catch (error) {
        res.status(400).json({ message: "Invalid or expired token" });
    }
};
