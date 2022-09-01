// import expressRouter from "express-async-router";
import PromiseRouter from "express-promise-router";
import { moviesRepo } from "../dataAccess/repositories";
import {
  authenticateToken,
  validateRequestSchema,
} from "../middleware/index.mjs";
import { moviesRouteSchema } from "./Schemas";

// export const moviesRouter = new expressRouter.AsyncRouter();
export const moviesRouter = PromiseRouter();

moviesRouter.get("/", authenticateToken, async (req, res) => {
  const result = await moviesRepo.list();
  return res.status(200).json(result);
});

moviesRouter.get(
  "/:id",
  [
    authenticateToken,
    moviesRouteSchema.getDeleteMovieSchema,
    validateRequestSchema,
  ],
  async (req, res) => {
    const { id } = req.params;
    const result = await moviesRepo.get(id);
    return res.status(200).json(result);
  }
);

moviesRouter.post(
  "/create",
  [
    authenticateToken,
    moviesRouteSchema.createUserSchema,
    validateRequestSchema,
  ],
  async (req, res) => {
    const {
      id,
      adult,
      backdrop_path,
      title,
      release_date,
      poster_path,
      popularity,
      overview,
    } = req.body;

    const result = await moviesRepo.create(
      id,
      adult,
      backdrop_path,
      title,
      release_date,
      poster_path,
      popularity,
      overview
    );
    return res.status(200).json(result);
  }
);

moviesRouter.put(
  "/update",
  authenticateToken,
  moviesRouteSchema.updateMovieSchema,
  validateRequestSchema,
  async (req, res) => {
    const { id } = req.query;
    const { fields } = req.body;
    const result = await moviesRepo.update(id, fields);
    return res.status(200).json(result);
  }
);

moviesRouter.delete(
  "/delete/:id",
  [
    authenticateToken,
    moviesRouteSchema.getDeleteMovieSchema,
    validateRequestSchema,
  ],
  async (req, res) => {
    const { id } = req.params;
    const result = await moviesRepo.delete(id);
    return res.status(200).json(result);
  }
);

moviesRouter.get(
  "/seedmovies/:page",
  [
    authenticateToken,
    moviesRouteSchema.seedMoviesSchema,
    validateRequestSchema,
  ],
  async (req, res) => {
    const { page } = req.params;
    res.status(200).json(await moviesRepo.seed(page));
  }
);
