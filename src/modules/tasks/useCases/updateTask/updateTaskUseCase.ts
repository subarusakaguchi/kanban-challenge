import {
  ITasksRepository,
  IUpdateTaskDTO,
} from "../../repositories/ITasksRepository";
import { inject, injectable } from "tsyringe";
import { Task } from "@modules/tasks/entities/Task";
import { AppError } from "@shared/errors/AppError";

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

    const updatedTask = await this.tasksRepository.update(id, data);

    return updatedTask;
  }
}

export { UpdateTaskUseCase };
