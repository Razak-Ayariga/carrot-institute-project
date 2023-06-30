import DataTypes from "sequelize";
import sequelize from "../database/dbConfig.js";

const orders = sequelize.define("orders", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "users",
            key:"id"
        },
        allowNull: false
    },
    restaurant_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "restaurants",
            key:"id"
        },
        allowNull: false
    },
    menu_id: {
        type: DataTypes.INTEGER,
        reference: {
            model:"menu_items",
            key: "id"
        }
    },

    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "pending"
    }
});
(async () => {
  await sequelize.sync();
})();

export default orders;