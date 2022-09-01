import { sequelize } from "../database.mjs";
import { userSchema } from "../schemas";

export const userModel = sequelize.define(
  "users",
  userSchema,
  {
    underscored: true,
    timestamps: true,
  },
  { freezeTableName: true }
);
