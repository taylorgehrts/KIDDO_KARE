const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const User = require('./User');

class SitterInfo extends Model {}

SitterInfo.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    age: {
        type: DataTypes.INTEGER
    },
    certifications: {
        type: DataTypes.TEXT
    },
    yearsExperience: {
        type: DataTypes.INTEGER
    },
    qualifications: {
        type: DataTypes.TEXT
    }
},
{
    sequelize,
    freezeTableName: true,
    modelName: 'SitterInfo'
});

module.exports = SitterInfo;