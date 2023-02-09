import { Router } from "express";
import { DeleteTaskController } from "../modules/tasks/useCases/deleteTask/deleteTaskController";
import { CreateTaskController } from "../modules/tasks/useCases/createTask/createTaskController";
import { GetAllTasksController } from "../modules/tasks/useCases/getAllTasks/getAllTasksController";

const tasksRoutes = Router();

const getAllTasksController = new GetAllTasksController();
const createTaskController = new CreateTaskController();
const deleteTaskController = new DeleteTaskController();

tasksRoutes.get("/all", getAllTasksController.handle);
tasksRoutes.post("/", createTaskController.handle);
tasksRoutes.delete("/:id", deleteTaskController.handle);

export { tasksRoutes };
