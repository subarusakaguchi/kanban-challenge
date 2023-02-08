import {
  ICreateTaskDTO,
  ITasksRepository,
} from "../../repositories/ITasksRepository";
import { inject, injectable } from "tsyringe";
import { Task } from "../../../tasks/entities/task";

@injectable()
class CreateTaskUseCase {
  constructor(
    @inject("TasksRepository")
    private tasksRepository: ITasksRepository
  ) {}

  async execute(data: ICreateTaskDTO): Promise<Task> {
    const newTask = this.tasksRepository.create(data);

    return newTask;
  }
}

export { CreateTaskUseCase };
