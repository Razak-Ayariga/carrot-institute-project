import DataTypes from "sequelize";
import sequelize from "../database/dbConfig.js";
import menuItem from "./menuModel.js";
import orders from "./ordersModel.js";

const restaurants = sequelize.define("restaurants", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },

    phone_number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    logo: {
        type: DataTypes.STRING,
        allowNull: true
    }
});
(async () => {
  await sequelize.sync();
})();

restaurants.hasMany(menuItem, { foreignKey: "restaurant_id" });
restaurants.hasMany(orders, { foreignKey: "restaurant_id" });

export default restaurants;