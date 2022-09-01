import validation from "express-validator";

const { validationResult } = validation;

export const validateRequestSchema = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  next();
};
