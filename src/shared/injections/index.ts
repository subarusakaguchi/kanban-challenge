import { PrismaTasksRepository } from "@modules/tasks/repositories/implementations/PrismaTasksRepositories";
import { ITasksRepository } from "@modules/tasks/repositories/ITasksRepository";
import { container } from "tsyringe";

container.registerSingleton<ITasksRepository>(
  "TasksRepository",
  PrismaTasksRepository
);
