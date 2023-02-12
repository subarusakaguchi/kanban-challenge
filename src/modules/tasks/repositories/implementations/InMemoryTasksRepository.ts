import { Task } from "@modules/tasks/entities/Task";
import { randomUUID } from "crypto";
import {
  ICreateTaskDTO,
  ITasksRepository,
  IUpdateTaskDTO,
} from "../ITasksRepository";

class InMemoryTasksRepository implements ITasksRepository {
  private tasks: Task[];

  constructor() {
    if (!this.tasks) {
      this.tasks = [];
    }
  }

  async listAll(): Promise<Task[]> {
    return this.tasks;
  }

  async create(data: ICreateTaskDTO): Promise<Task> {
    const newTask = new Task();

    data.id = randomUUID();

    Object.assign(newTask, {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.tasks.push(newTask);

    return newTask;
  }

  async delete(id: string): Promise<void> {
    this.tasks = this.tasks.filter((task) => id !== task.id);
  }

  async update(id: string, data: IUpdateTaskDTO): Promise<Task> {
    const taskIndex = this.tasks.findIndex((task) => id === task.id);

    Object.keys(data).forEach((key) => {
      if (key !== "id") {
        data[key] = data[key] || this.tasks[taskIndex][key];
      }
    });

    data.updatedAt = new Date();

    Object.assign(this.tasks[taskIndex], data);

    return this.tasks[taskIndex];
  }

  async findById(id: string): Promise<Task> {
    return this.tasks.find((task) => id === task.id);
  }
}

export { InMemoryTasksRepository };
