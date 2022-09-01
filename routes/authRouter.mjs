// import expressRouter from "express-async-router";
import PromiseRouter from "express-promise-router";
import { authRepo } from "../dataAccess/repositories";
import { validateRequestSchema } from "../middleware/index.mjs";
import { authRouteSchema } from "./Schemas";

// export const authRouter = new expressRouter.AsyncRouter();
export const authRouter = PromiseRouter();

authRouter.post(
  "/sign-up",
  authRouteSchema.signUpSchema,
  validateRequestSchema,
  async (req, res) => {
    const { name, email, password, confirmPassword, role } = req.body;
    const result = await authRepo.SignUp(
      name,
      email,
      password,
      confirmPassword,
      role
    );

    return res.status(200).json(result);
  }
);

authRouter.post(
  "/sign-in",
  authRouteSchema.signInSchema,
  validateRequestSchema,
  async (req, res) => {
    const { email, password } = req.body;
    const result = await authRepo.SignIn(email, password);

    return res.status(200).json(result);
  }
);

authRouter.post(
  "/refresh-token",
  authRouteSchema.refreshTokenSchema,
  validateRequestSchema,
  async (req, res) => {
    const { refreshToken } = req.body;

    if (refreshToken == null)
      return res.status(401).json({ message: "Unauthorized" });
    const result = await authRepo.refreshToken(refreshToken);

    return res.status(200).json(result);
  }
);

authRouter.delete(
  "/logout",
  authRouteSchema.refreshTokenSchema,
  validateRequestSchema,
  async (req, res) => {
    const { refreshToken } = req.body;
    const result = await authRepo.deleteRefreshToken(refreshToken);
    return res.status(200).json(result);
  }
);

