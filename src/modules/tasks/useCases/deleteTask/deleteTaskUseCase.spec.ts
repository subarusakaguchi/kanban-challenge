import { Task } from "@modules/tasks/entities/Task";
import { InMemoryTasksRepository } from "@modules/tasks/repositories/implementations/InMemoryTasksRepository";
import { AppError } from "@shared/errors/AppError";
import { randomUUID } from "crypto";
import { DeleteTaskUseCase } from "./deleteTaskUseCase";

let deleteTaskUseCase: DeleteTaskUseCase;
let inMemoryTasksRepository: InMemoryTasksRepository;

describe("Delete task", () => {
  beforeEach(() => {
    inMemoryTasksRepository = new InMemoryTasksRepository();
    deleteTaskUseCase = new DeleteTaskUseCase(inMemoryTasksRepository);
  });

  it("Should be able to delete a task by id", async () => {
    const taskData: Task = {
      title: "Meu título teste 1",
      content:
        "Donec in quam a erat pharetra accumsan. Maecenas eleifend enim quis sapien scelerisque interdum. In hac habitasse platea dictumst. Maecenas congue nunc vel risus pretium pellentesque. Sed iaculis egestas nibh, ac porta tortor pretium et. Maecenas feugiat consectetur leo, at convallis tellus cursus vel. Nunc pulvinar odio ut lectus viverra mollis.",
      status: "REVIEW",
    };

    const taskToDeleteData: Task = {
      title: "Meu título teste 2",
      content:
        "Curabitur molestie luctus feugiat. Aenean ut porta ante, sit amet sagittis purus. Proin sem nunc, pellentesque vitae congue sit amet, commodo quis metus. Nam dapibus leo varius maximus iaculis. Sed volutpat sollicitudin orci ac maximus. Sed accumsan id eros at interdum. Etiam ullamcorper diam nec sapien cursus pharetra. Suspendisse potenti.",
      status: "DONE",
    };

    const referenceTask = await inMemoryTasksRepository.create(taskData);
    const toDeleteTask = await inMemoryTasksRepository.create(taskToDeleteData);

    await deleteTaskUseCase.execute(toDeleteTask.id);

    const taskToVerify = await inMemoryTasksRepository.listAll();

    expect(taskToVerify[0].content).toEqual(referenceTask.content);
  });

  it("Should not be able to delete a non-existing task", async () => {
    const fakeId = randomUUID();

    await expect(deleteTaskUseCase.execute(fakeId)).rejects.toEqual(
      new AppError("Task not found", 404)
    );
  });
});
