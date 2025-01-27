const { Model, DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../configs/db");


class State extends Model {

}



State.init({


    stateId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    stateName: {
        type: DataTypes.STRING,
        allowNull: false
    },


}, {
    sequelize, // Pass the Sequelize instance here
    modelName: "State", // Name of the model
    timestamps: true, // Enable timestamps if you want `createdAt` and `updatedAt`
})


module.exports = State;


