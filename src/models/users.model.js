const { Model, DataTypes } = require("sequelize");
const sequelize = require('../configs/db')
const bcrypt = require('bcryptjs');
class User extends Model {

}


User.init({

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    mobile: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false
    },
    stateId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    districtId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    pincode: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }

}, {
    sequelize,
    timestamps: true,
    tableName: 'Users'

})

User.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, 10);
});


module.exports = User;