import { ITasksRepository } from "../../repositories/ITasksRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class DeleteTaskUseCase {
  constructor(
    @inject("TasksRepository")
    private tasksRepository: ITasksRepository
  ) {}
  async execute(id: string): Promise<void> {
    const taskExists = await this.tasksRepository.findById(id);

    if (!taskExists) {
      throw new Error("Task not found");
    }

    this.tasksRepository.delete(id);
  }
}

export { DeleteTaskUseCase };
