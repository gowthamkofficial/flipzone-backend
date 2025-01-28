const sequelize = require("../configs/db");
const District = require("./district.model");
const State = require("./state.model");


// Sync models with database
const syncTables = async () => {

    try {
        await sequelize.sync({ force: false ,alter:true}); // Set to `true` to drop and recreate tables
        console.log('All tables synced successfully.'); 
    } catch (error) {
        console.error('Error syncing tables:', error.message);
    }
};

module.exports = { syncTables ,State,District};