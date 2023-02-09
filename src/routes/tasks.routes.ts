import { Router } from "express";
import { CreateTaskController } from "../modules/tasks/useCases/createTask/createTaskController";
import { GetAllTasksController } from "../modules/tasks/useCases/getAllTasks/getAllTasksController";

const tasksRoutes = Router();

const getAllTasksController = new GetAllTasksController();
const createTaskController = new CreateTaskController();

tasksRoutes.get("/all", getAllTasksController.handle);
tasksRoutes.post("/create", createTaskController.handle);

export { tasksRoutes };
