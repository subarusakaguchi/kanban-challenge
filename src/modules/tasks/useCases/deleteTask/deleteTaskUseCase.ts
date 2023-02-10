import { ITasksRepository } from "../../repositories/ITasksRepository";
import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";

@injectable()
class DeleteTaskUseCase {
  constructor(
    @inject("TasksRepository")
    private tasksRepository: ITasksRepository
  ) {}
  async execute(id: string): Promise<void> {
    const taskExists = await this.tasksRepository.findById(id);

    if (!taskExists) {
      throw new AppError("Task not found", 404);
    }

    this.tasksRepository.delete(id);
  }
}

export { DeleteTaskUseCase };
