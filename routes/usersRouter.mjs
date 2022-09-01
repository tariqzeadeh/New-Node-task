// import expressRouter from "express-async-router";
import PromiseRouter from "express-promise-router";
import { usersRepo } from "../dataAccess/repositories";
import {
  validateRequestSchema,
  authenticateToken,
} from "../middleware/index.mjs";
import { userRouteSchema } from "./Schemas";

// export const userRouter = new expressRouter.AsyncRouter();
export const userRouter = PromiseRouter();

userRouter.get("/", authenticateToken, async (req, res) => {
  const result = await usersRepo.list();
  return res.status(200).json(result);
});

userRouter.get(
  "/:id",
  authenticateToken,
  userRouteSchema.getDeleteUserSchema,
  validateRequestSchema,
  async (req, res) => {
    const result = await usersRepo.get(req.params.id);
    return res.status(200).json(result);
  }
);

userRouter.put(
  "/update",
  authenticateToken,
  userRouteSchema.updateUserSchema,
  validateRequestSchema,
  async (req, res) => {
    const { id } = req.query;
    const { fields } = req.body;
    const result = await usersRepo.update(id, fields);
    return res.status(200).json(result);
  }
);

userRouter.delete(
  "/delete/:id",
  authenticateToken,
  userRouteSchema.getDeleteUserSchema,
  validateRequestSchema,
  async (req, res) => {
    const result = await usersRepo.delete(req.params.id);
    return res.status(200).json(result);
  }
);
