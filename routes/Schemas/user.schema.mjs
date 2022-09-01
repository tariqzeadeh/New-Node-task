import validation from "express-validator";

const { body, param, query, check } = validation;

export const userRouteSchema = {
  getDeleteUserSchema: [
    param("id").isInt().bail().withMessage("The id should be a number"),
  ],
  updateUserSchema: [
    query("id")
      .exists()
      .bail()
      .withMessage("User id is required")
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
// export const userRouteSchema = {
//   params: Joi.object({
//     id: Joi.number(),
//   }),
//   body: Joi.object({
//     id: Joi.number(),
//     name: Joi.string(),
//     email: Joi.string().email(),
//     password: Joi.string().min(5),
//     role: Joi.string(),
//     fields: Joi.object({
//       name: Joi.string(),
//       email: Joi.string().email(),
//       password: Joi.string().min(5),
//       role: Joi.string(),
//     }),
//   }),
// };
