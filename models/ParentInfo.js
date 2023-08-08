const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ParentInfo extends Model {}

ParentInfo.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    numberOfKids: {
        type: DataTypes.INTEGER
    }
},
{
    sequelize,
    freezeTableName: true,
    modelName: 'ParentInfo'
});

module.exports = ParentInfo;