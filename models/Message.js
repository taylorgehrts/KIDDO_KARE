const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const Job = require('./Job');
const User = require('./User');

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
    senderName: {
        type: DataTypes.STRING
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