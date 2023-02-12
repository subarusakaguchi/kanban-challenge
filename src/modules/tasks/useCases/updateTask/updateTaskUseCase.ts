import {
  ITasksRepository,
  IUpdateTaskDTO,
} from "../../repositories/ITasksRepository";
import { inject, injectable } from "tsyringe";
import { Task } from "@modules/tasks/entities/Task";
import { AppError } from "@shared/errors/AppError";
import { TaskStatus } from "@prisma/client";

@injectable()
class UpdateTaskUseCase {
  constructor(
    @inject("TasksRepository")
    private tasksRepository: ITasksRepository
  ) {}
  async execute(id: string, data: IUpdateTaskDTO): Promise<Task> {
    const taskExists = await this.tasksRepository.findById(id);

    if (!taskExists) {
      throw new AppError("Task not found", 404);
    }

    if (
      !(
        (data.status && TaskStatus[data.status]) ||
        data.status === null ||
        data.status === undefined ||
        data.status === ("" as TaskStatus)
      )
    ) {
      throw new AppError("Unrecognized status type", 400);
    }

    if (data.title === "") {
      throw new AppError("A task must have a title", 400);
    }

    const updatedTask = await this.tasksRepository.update(id, data);

    return updatedTask;
  }
}

export { UpdateTaskUseCase };
