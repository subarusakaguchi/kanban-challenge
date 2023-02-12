import {
  ICreateTaskDTO,
  ITasksRepository,
} from "../../repositories/ITasksRepository";
import { inject, injectable } from "tsyringe";
import { Task } from "@modules/tasks/entities/Task";
import { AppError } from "@shared/errors/AppError";
import { TaskStatus } from "@prisma/client";

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

    data.status = data.status || "PENDING";

    const newTask = this.tasksRepository.create(data);

    return newTask;
  }
}

export { CreateTaskUseCase };
