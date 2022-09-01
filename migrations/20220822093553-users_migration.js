"use strict";
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("users", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        field: "name",
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        field: "email",
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        isEmail: true,
      },
      password: {
        field: "password",
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        field: "role",
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable("users");
  },
};
