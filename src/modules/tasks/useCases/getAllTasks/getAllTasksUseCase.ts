import { ITasksRepository } from "../../repositories/ITasksRepository";
import { inject, injectable } from "tsyringe";
import { Task } from "@modules/tasks/entities/Task";

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
