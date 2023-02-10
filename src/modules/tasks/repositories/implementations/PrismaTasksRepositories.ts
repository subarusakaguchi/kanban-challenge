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
  async create(data: ICreateTaskDTO): Promise<Task> {
    const newTask = await client.task.create({
      data,
    });

    return newTask;
  }
  async delete(id: string): Promise<void> {
    await client.task.delete({
      where: {
        id,
      },
    });
  }
  async update(id: string, data: IUpdateTaskDTO): Promise<Task> {
    const updatedTask = await client.task.update({
      where: {
        id,
      },
      data,
    });

    return updatedTask;
  }
  async findById(id: string): Promise<Task> {
    const task = await client.task.findFirst({
      where: {
        id,
      },
    });

    return task;
  }
}

export { PrismaTasksRepository };
