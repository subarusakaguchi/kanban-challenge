import { TaskStatus } from "@prisma/client";
import { Task } from "../entities/Task";

interface ICreateTaskDTO {
  title: string;
  content?: string;
  status?: TaskStatus;
}

interface IUpdateTaskDTO {
  id: string;
  title?: string;
  content?: string;
  status?: TaskStatus;
}

interface ITasksRepository {
  listAll(): Promise<Task[]>;
  create(data: ICreateTaskDTO): Promise<Task>;
  delete(id: string): Promise<void>;
  update(data: IUpdateTaskDTO): Promise<Task>;
  findById(id: string): Promise<Task>;
}

export { ITasksRepository, ICreateTaskDTO, IUpdateTaskDTO };
