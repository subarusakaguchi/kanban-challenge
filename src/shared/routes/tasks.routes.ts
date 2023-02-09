import { CreateTaskController } from "@modules/tasks/useCases/createTask/createTaskController";
import { DeleteTaskController } from "@modules/tasks/useCases/deleteTask/deleteTaskController";
import { GetAllTasksController } from "@modules/tasks/useCases/getAllTasks/getAllTasksController";
import { UpdateTaskController } from "@modules/tasks/useCases/updateTask/updatedTaskController";
import { Router } from "express";

const tasksRoutes = Router();

const getAllTasksController = new GetAllTasksController();
const createTaskController = new CreateTaskController();
const deleteTaskController = new DeleteTaskController();
const updateTaskController = new UpdateTaskController();

tasksRoutes.get("/all", getAllTasksController.handle);
tasksRoutes.post("/", createTaskController.handle);
tasksRoutes.delete("/:id", deleteTaskController.handle);
tasksRoutes.put("/:id", updateTaskController.handle);

export { tasksRoutes };
