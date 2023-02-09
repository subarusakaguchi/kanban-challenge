import {
  ICreateTaskDTO,
  ITasksRepository,
  IUpdateTaskDTO,
} from "../ITasksRepository";

import { client } from "../../../../shared/prisma/client";
import { Task } from "@modules/tasks/entities/Task";

class PrismaTasksRepository implements ITasksRepository {
  async listAll(): Promise<Task[]> {
    const allTasks = await client.task.findMany();

    return allTasks;
  }
  create(data: ICreateTaskDTO): Promise<Task> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  update(data: IUpdateTaskDTO): Promise<Task> {
    throw new Error("Method not implemented.");
  }
  findById(id: string): Promise<Task> {
    throw new Error("Method not implemented.");
  }
}

export { PrismaTasksRepository };
