import { sequelize } from "../database.mjs";
import { refreshTokenSchema } from "../schemas";

export const refreshTokenModel = sequelize.define(
  "refresh-tokens",
  refreshTokenSchema,
  {
    underscored: true,
    timestamps: true,
  },
  { freezeTableName: true }
);
