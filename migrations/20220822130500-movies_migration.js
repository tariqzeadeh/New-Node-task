"use strict";

module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("movies", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
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
        allowNull: false,
        field: "popularity",
      },
      overview: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: "overview",
      },
      created_at: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      updated_at: {
        allowNull: true,
        type: DataTypes.DATE,
      },
    });
  },

  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable("movies");
  },
};
