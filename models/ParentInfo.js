const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const User = require('./User');

class ParentInfo extends Model {}

ParentInfo.init({
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
    bedTime: {
        type: DataTypes.STRING
    }
},
{
    sequelize,
    freezeTableName: true,
    modelName: 'ParentInfo'
});

module.exports = ParentInfo;