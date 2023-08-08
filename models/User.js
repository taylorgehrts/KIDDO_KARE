const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

const sequelize = require('../config/connection');

class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, 
        validate: {
            isEmail: true
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        set(value) {
            this.setDataValue('password', bcrypt.hash(value, 10));
        }
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isNumeric: true
        }
    },
    address: {
        type: DataTypes.STRING
    },
    isSitter: {
        type: DataTypes.BOOLEAN
    },
    sitterInfoId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'SitterInfo',
            key: 'id'
        }
    },
    parentInfoId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'ParentInfo',
            key: 'id'
        }
    }
}, 
{
    sequelize,
    freezeTableName: true,
    modelName: 'User'
});