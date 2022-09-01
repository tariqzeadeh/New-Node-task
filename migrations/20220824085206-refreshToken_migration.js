"use strict";

module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("refresh-tokens", {
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
    await queryInterface.dropTable("refresh-token");
  },
};
