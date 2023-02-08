import { ITasksRepository } from "../modules/tasks/repositories/ITasksRepository";
import { TasksRepository } from "../modules/tasks/repositories/tasksRepository";
import { container } from "tsyringe";

container.registerSingleton<ITasksRepository>(
  "TasksRepository",
  TasksRepository
);
