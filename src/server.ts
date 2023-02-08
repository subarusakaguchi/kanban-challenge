import "reflect-metadata";
import express from "express";

import "./injections";
import { routes } from "./routes";

const PORT = process.env.PORT || 3333;

const app = express();

app.use(express.json());

app.use("/api/v1", routes);

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
