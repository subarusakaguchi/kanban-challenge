import { Router } from "express";
import { tasksRoutes } from "./tasks.routes";

const routes = Router();

routes.use("/tasks", tasksRoutes);

export { routes };
