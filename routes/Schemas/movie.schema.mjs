import validation from "express-validator";

const { body, param, query, check } = validation;

export const moviesRouteSchema = {
  getDeleteMovieSchema: [
    param("id").isInt().bail().withMessage("The id should be a number"),
  ],
  seedMoviesSchema: [
    param("page").isInt().bail().withMessage("The page should be a number"),
  ],
  createUserSchema: [
    body("id")
      .exists()
      .bail()
      .withMessage("Id is required")
      .isInt()
      .bail()
      .withMessage("Id must be a number"),
    body("adult")
      .optional({ nullable: true, checkFalsy: true })
      .exists()
      .bail()
      .withMessage("Adult field is required")
      .isBoolean()
      .bail()
      .withMessage("Adult field must be boolean value"),
    body("backdrop_path")
      .optional({ nullable: true, checkFalsy: true })
      .exists()
      .bail()
      .withMessage("backdrop_path field is required")
      .isString()
      .bail()
      .withMessage("backdrop_path field must be string"),
    body("title")
      .optional({ nullable: true, checkFalsy: true })
      .exists()
      .bail()
      .withMessage("title field is required")
      .isString()
      .bail()
      .withMessage("title field must be string"),
    body("release_date")
      .exists()
      .bail()
      .withMessage("release_date field is required")
      .isString()
      .bail()
      .withMessage("release_date field must be string"),
    body("poster_path")
      .optional({ nullable: true, checkFalsy: true })
      .exists()
      .bail()
      .withMessage("poster_path field is required")
      .isString()
      .bail()
      .withMessage("poster_path field must be string"),
    body("popularity")
      .optional({ nullable: true, checkFalsy: false })
      .exists()
      .bail()
      .withMessage("popularity field is required")
      .isDecimal()
      .bail()
      .withMessage("popularity field must be number"),
    body("overview")
      .optional({ nullable: true, checkFalsy: true })
      .exists()
      .bail()
      .withMessage("overview field is required")
      .isString()
      .bail()
      .withMessage("overview field must be string"),
  ],
  updateMovieSchema: [
    query("id")
      .exists()
      .bail()
      .withMessage("Movie id is required")
      .isInt()
      .bail()
      .withMessage("The id should be a number"),
    body("fields")
      .exists({ checkFalsy: true, checkNull: true })
      .bail()
      .withMessage("Updating Fields should Be Provided")
      .isObject()
      .bail()
      .withMessage("Fields should be wrapped in an object"),
  ],
};

// import Joi from "joi";

// export const moviesRouteSchema = {
//   params: Joi.object({
//     id: Joi.number(),
//     page: Joi.number(),
//   }),
//   query: Joi.object({
//     id: Joi.number().required(),
//   }),
//   updateMovieSchema: {
//     body: Joi.object({
//       fields: Joi.object({
//         id: Joi.number(),
//         adult: Joi.boolean(),
//         backdrop_path: Joi.string(),
//         title: Joi.string(),
//         release_date: Joi.string(),
//         poster_path: Joi.string(),
//         popularity: Joi.number(),
//         overview: Joi.string(),
//       }),
//     }),
//   },
//   createMovieSchema: {
//     body: Joi.object({
//       id: Joi.number().required(),
//       adult: Joi.boolean().required(),
//       backdrop_path: Joi.string(),
//       title: Joi.string().required(),
//       release_date: Joi.string().required(),
//       poster_path: Joi.string(),
//       popularity: Joi.number(),
//       overview: Joi.string().required(),
//     }),
//   },
// };
