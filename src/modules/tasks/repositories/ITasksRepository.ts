import { Prisma, TaskStatus } from "@prisma/client";
import { Task } from "../entities/Task";

interface ICreateTaskDTO extends Prisma.TaskUncheckedCreateInput {}

interface IUpdateTaskDTO extends Prisma.TaskUncheckedUpdateInput {
  status?: TaskStatus | null;
}

interface ITasksRepository {
  listAll(): Promise<Task[]>;
  create(data: ICreateTaskDTO): Promise<Task>;
  delete(id: string): Promise<void>;
  update(id: string, data: IUpdateTaskDTO): Promise<Task>;
  findById(id: string): Promise<Task>;
}

export { ITasksRepository, ICreateTaskDTO, IUpdateTaskDTO };
