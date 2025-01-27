const { Model, DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../configs/db");


class District extends Model {

}



District.init({


    districId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    districtName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    stateId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }


},
    {
        sequelize, // Pass the Sequelize instance here
        modelName: "District", // Name of the model
        timestamps: true, // Enable timestamps if you want `createdAt` and `updatedAt`
    })


module.exports = District;


