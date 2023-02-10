import {
  ICreateTaskDTO,
  ITasksRepository,
} from "../../repositories/ITasksRepository";
import { inject, injectable } from "tsyringe";
import { Task } from "@modules/tasks/entities/Task";
import { TaskStatus } from "@prisma/client";
import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateTaskUseCase {
  constructor(
    @inject("TasksRepository")
    private tasksRepository: ITasksRepository
  ) {}

  async execute(data: ICreateTaskDTO): Promise<Task> {
    if (!data.title) {
      throw new AppError("Its necessary a Title to create a Task", 400);
    }

    data.status = data.status || ("PENDING" as TaskStatus);

    const newTask = this.tasksRepository.create(data);

    return newTask;
  }
}

export { CreateTaskUseCase };
