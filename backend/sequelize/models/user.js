const { DataTypes } = require('sequelize');
const sequelize = require('../../sequelize/config/sequelize');
const bcrypt = require('bcrypt');

const User = sequelize.define(
    'user',
    {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        firstName:{
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName:{
            type: DataTypes.STRING,
            allowNull: false
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false,
            set(password) {
                if(password){
                    const hashedPassword = bcrypt.hashSync(
                        password,
                        bcrypt.genSaltSync(Number(process.env.SALT))
                    );
                    this.setDataValue('password', hashedPassword);
                }
            }
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('active', 'deactive'),
            allowNull: false,
            defaultValue: 'deactive'
        }
    }
)

module.exports = User;