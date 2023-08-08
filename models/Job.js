const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const ParentInfo = require('./ParentInfo');
const SitterInfo = require('./SitterInfo');

class Job extends Model {}

Job.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    startTime: {
        type: DataTypes.DATE,
        allowNull: false
    },
    endTime: {
        type: DataTypes.DATE,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    }
    
},
{
    sequelize,
    freezeTableName: true,
    modelName: 'Job'
});

module.exports = Job;