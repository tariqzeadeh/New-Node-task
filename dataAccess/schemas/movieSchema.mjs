import Sequelize from "sequelize";
const { DataTypes } = Sequelize;

export const movieSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  adult: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    field: "adult",
  },
  backdrop_path: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "backdrop_path",
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "title",
  },
  release_date: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "release_date",
  },
  poster_path: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "poster_path",
  },
  popularity: {
    type: DataTypes.DOUBLE,
    allowNull: true,
    field: "popularity",
  },
  overview: {
    type: DataTypes.TEXT,
    allowNull: false,
    field: "overview",
  },
};
