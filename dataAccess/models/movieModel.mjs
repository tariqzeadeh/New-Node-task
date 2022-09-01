import { sequelize } from "../database.mjs";
import { movieSchema } from "../schemas";

export const movieModel = sequelize.define(
  "movies",
  movieSchema,
  {
    underscored: true,
    timestamps: true,
  },
  { freezeTableName: true }
);
