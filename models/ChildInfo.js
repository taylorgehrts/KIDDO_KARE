const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const ParentInfo = require('./ParentInfo');

class ChildInfo extends Model {}

ChildInfo.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
{
    sequelize,
    freezeTableName: true,
    modelName: 'ChildInfo'
});

module.exports = ChildInfo;