import { Task } from "../../entities/task";
import { ITasksRepository } from "../../repositories/ITasksRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class GetAllTasksUseCase {
  constructor(
    @inject("TasksRepository")
    private tasksRepository: ITasksRepository
  ) {}
  async execute(): Promise<Task[]> {
    const allTasks = await this.tasksRepository.listAll();

    return allTasks;
  }
}

export { GetAllTasksUseCase };
