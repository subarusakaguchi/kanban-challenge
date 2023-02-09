import {
  ITasksRepository,
  IUpdateTaskDTO,
} from "../../repositories/ITasksRepository";
import { inject, injectable } from "tsyringe";
import { Task } from "@modules/tasks/entities/Task";

@injectable()
class UpdateTaskUseCase {
  constructor(
    @inject("TasksRepository")
    private tasksRepository: ITasksRepository
  ) {}
  async execute(data: IUpdateTaskDTO): Promise<Task> {
    const taskExists = await this.tasksRepository.findById(data.id);

    if (!taskExists) {
      throw new Error("Task not found");
    }

    const updatedTask = await this.tasksRepository.update(data);

    return updatedTask;
  }
}

export { UpdateTaskUseCase };
