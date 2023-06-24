import DataTypes from "sequelize";
import sequelize from "../database/dbConfig.js";

const menuItem = sequelize.define("menu_items", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    restaurant_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "restaurants",
            key:"id"
        },
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.STRING,
        allowNull: false
    }
});
(async () => {
  await sequelize.sync();
})();

export default menuItem;