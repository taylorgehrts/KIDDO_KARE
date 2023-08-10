const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

const sequelize = require('../config/connection');

class User extends Model {
    comparePasswordHash(clearTextPassword) {
        return bcrypt.compareSync(clearTextPassword, this.getDataValue('password'));
    }

    getFullName() {
        return `${this.getDataValue('firstName')} ${this.getDataValue('lastName')}`;
    }
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, 
        validate: {
            isEmail: true
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        set(value) {
            this.setDataValue('password', bcrypt.hashSync(value, 10));
        }
    },
    firstName: {
        type: DataTypes.STRING,
    },
    lastName: {
        type: DataTypes.STRING
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isNumeric: true
        }
    },
    address: {
        type: DataTypes.STRING
    },
    bio: {
        type: DataTypes.TEXT
    }
    // test if we need this
    // isSitter: {
    //     type: DataTypes.BOOLEAN
    // },
}, 
{
    sequelize,
    freezeTableName: true,
    modelName: 'User'
});

module.exports = User;