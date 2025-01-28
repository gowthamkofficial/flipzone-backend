const { Model, DataTypes, INTEGER } = require("sequelize");
const sequelize = require('../configs/db')
class Cart extends Model {

}


Cart.init({
    cartId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    product: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: {}
    }

}, {
    sequelize,
    timestamps: true,
    tableName: 'Carts',

})

module.exports = Cart;