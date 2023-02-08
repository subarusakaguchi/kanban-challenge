import { Router } from "express";
import { GetAllTasksContoller } from "../modules/tasks/useCases/getAllTasks/getAllTasksController";

const tasksRoutes = Router();

const getAllTasksController = new GetAllTasksContoller();

tasksRoutes.get("/all", getAllTasksController.handle);

export { tasksRoutes };
