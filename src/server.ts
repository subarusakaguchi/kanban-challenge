import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";

import "./shared/injections";
import { routes } from "./shared/routes";
import { AppError } from "@shared/errors/AppError";

const PORT = process.env.PORT || 3333;

const app = express();

app.use(express.json());

app.use("/api/v1", routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json(err.message);
  }

  return res.status(500).json({
    status: "Error",
    message: `Internal Server Error - ${err.message}`,
  });
});

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
