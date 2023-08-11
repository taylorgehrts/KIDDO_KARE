const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const ParentInfo = require('./ParentInfo');
const Job = require('./Job');

class ChildInfo extends Model {
    getFullName() {
        return `${this.getDataValue('firstName')} ${this.getDataValue('lastName')}`;
    }
}

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
    },
    firstName: {
        type: DataTypes.STRING
    },
    lastName: {
        type: DataTypes.STRING
    },
    parentId: {
        type: DataTypes.INTEGER,
        references: {
            model: ParentInfo,
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
    modelName: 'ChildInfo'
});

module.exports = ChildInfo;