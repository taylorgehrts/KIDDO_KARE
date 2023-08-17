const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const Job = require('./Job');

class Message extends Model {}

Message.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    body: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    jobId: {
        type: DataTypes.INTEGER,
        references: {
            model: Job,
            key: 'id'
        }
    }
}, {
    sequelize,
    freezeTableName: true,
    modelName: 'Message'
});

module.exports = Message;