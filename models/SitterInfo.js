const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class SitterInfo extends Model {}

SitterInfo.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    }
},
{
    sequelize,
    freezeTableName: true,
    modelName: 'SitterInfo'
});

module.exports = SitterInfo;