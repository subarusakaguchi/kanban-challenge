import { Task, TaskPossibleStatus } from "../entities/task";

interface ICreateTaskDTO {
  title: string;
  content?: string;
  status?: TaskPossibleStatus;
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
