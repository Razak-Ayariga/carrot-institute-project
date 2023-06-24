import DataTypes from "sequelize";
import sequelize from "../database/dbConfig.js";
import orders from "./ordersModel.js";

const users = sequelize.define("users", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    full_name: {
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
    }
});
(async () => {
  await sequelize.sync();
})();

users.hasMany(orders, { foreignKey: "user_id" });

export default users;