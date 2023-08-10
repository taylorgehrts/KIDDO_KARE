const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const Job = require('./Job');
const SitterInfo = require('./SitterInfo');

class SitterInterests extends Model {}

SitterInterests.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    sitterId: {
        type: DataTypes.INTEGER,
        references: {
            model: SitterInfo,
            key: 'id'
        }
    },
    jobId: {
        type: DataTypes.INTEGER,
        references: {
            model: Job,
            key: 'id'
        }
    }
},
{
    sequelize,
    freezeTableName: true,
    modelName: 'SitterInterests'
});

module.exports = SitterInterests;