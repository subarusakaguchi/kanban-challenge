import { Task } from "../entities/task";

interface ICreateTaskDTO {
  title: string;
  content?: string;
}

interface IUpdateTaskDTO {
  id: string;
  title?: string;
  content?: string;
}

interface ITasksRepository {
  listAll(): Promise<Task[]>;
  create(data: ICreateTaskDTO): Promise<Task>;
  delete(id: string): Promise<void>;
  update(data: IUpdateTaskDTO): Promise<Task>;
}

export { ITasksRepository, ICreateTaskDTO, IUpdateTaskDTO };
