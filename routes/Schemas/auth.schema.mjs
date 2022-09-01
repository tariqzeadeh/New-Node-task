import validation from "express-validator";

const { body } = validation;

export const authRouteSchema = {
  signUpSchema: [
    body("name")
      .exists()
      .not()
      .isEmpty()
      .withMessage("Name Is Required")
      .bail()
      .isString()
      .bail()
      .withMessage("Name Is Not valid")
      .isLength({ min: 3, max: 20 })
      .bail()
      .withMessage("Name must be within 3 to 20 character!"),

    body("email")
      .exists()
      .bail()
      .withMessage("Email Is Required")
      .not()
      .isEmpty()
      .bail()
      .isEmail()
      .bail()
      .withMessage("Invalid Email"),

    body("password")
      .exists()
      .bail()
      .withMessage("Password Is Required")
      .notEmpty()
      .bail()
      .withMessage("Empty Password!")
      .isLength({ min: 5, max: 20 })
      .bail()
      .withMessage("Password must be 8 to 20 characters long!")
      .not()
      .isIn(["12345678", "password"])
      .bail()
      .withMessage("Weak Password"),

    body("confirmPassword")
      .exists()
      .bail()
      .withMessage("ConfirmPassword Is Required")
      .custom((value, { req }) => {
        if (value !== req.body.password)
          throw new Error("Passwords Not Matching");
        return true;
      }),

    body("role")
      .not()
      .isEmpty()
      .bail()
      .isString()
      .bail()
      .withMessage("Invalid Role")
      .isIn(["Admin", "User"])
      .bail()
      .withMessage("Role Must Be Either Admin or User"),
  ],

  signInSchema: [
    body("email")
      .exists()
      .bail()
      .withMessage("Email Is Required")
      .not()
      .isEmpty()
      .bail()
      .isEmail()
      .bail()
      .withMessage("Invalid Email"),

    body("password")
      .exists()
      .bail()
      .withMessage("Password Is Required")
      .notEmpty()
      .bail()
      .withMessage("Empty Password!"),
  ],
  refreshTokenSchema: [
    body("refreshToken")
      .exists()
      .bail()
      .withMessage("RefreshToken Is Required")
      .isString()
      .bail()
      .notEmpty()
      .bail()
      .withMessage("Invalid token"),
  ],
};
