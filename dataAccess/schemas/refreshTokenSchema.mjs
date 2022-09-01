import Sequelize from "sequelize";
const { DataTypes } = Sequelize;

export const refreshTokenSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  refreshToken: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "refreshToken",
    unique: true,
  },
};
