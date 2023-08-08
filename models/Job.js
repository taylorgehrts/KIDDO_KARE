const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Job extends Model {}

Job.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    parentId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'ParentInfo',
            key: 'id'
        }
    },
    sitterId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'SitterInfo',
            key: 'id'
        }
    }
},
{
    sequelize,
    freezeTableName: true,
    modelName: 'Job'
});

module.exports = Job;