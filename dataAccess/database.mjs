import Sequelize from "sequelize";
import "../globals.mjs";

export const sequelize = new Sequelize(AppConfigs.connections.dbConfig);
