import express from "express";
import cors from "cors";
import { moviesRouter, userRouter, authRouter } from "./routes";
import { sequelize } from "./dataAccess/database.mjs";
import appInfo from "./package.json";
import "./globals.mjs";
export const app = express();

app.use(express.json());
app.use(cors());

app.use("/movies", moviesRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);

app.get("/moviesNodeTask/healthcheck", (req, res) => {
  return res.json({
    name: appInfo.name,
    version: appInfo.version,
    description: appInfo.description,
  });
});
app.use((err, req, res, next) => {
  res.status(err.status).send({
    status: err.status,
    message: err.message,
    path: req.originalUrl,
  });
});

app.listen(AppConfigs.port, async () => {
  console.log("listing to ", AppConfigs.port);
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});

// add the relations between user and movies
// add the role validation (middleware) to the routes
// refactor the code according to the relations
// search for how to validate an object entries in request body
// search for the best practice for writing the validation schema
// clean the code