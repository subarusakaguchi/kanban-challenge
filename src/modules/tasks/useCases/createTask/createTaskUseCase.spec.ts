import { Task } from "@modules/tasks/entities/Task";
import { InMemoryTasksRepository } from "@modules/tasks/repositories/implementations/InMemoryTasksRepository";
import { ICreateTaskDTO } from "@modules/tasks/repositories/ITasksRepository";
import { AppError } from "@shared/errors/AppError";
import { CreateTaskUseCase } from "./createTaskUseCase";

let createTaskUseCase: CreateTaskUseCase;
let inMemoryTasksRepository: InMemoryTasksRepository;

describe("Create Task", () => {
  beforeEach(() => {
    inMemoryTasksRepository = new InMemoryTasksRepository();
    createTaskUseCase = new CreateTaskUseCase(inMemoryTasksRepository);
  });

  it("Should be able to create a new task with a different status than PENDING", async () => {
    const taskData: Task = {
      title: "Meu título teste",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed hendrerit lobortis accumsan. Duis non ex nulla. Pellentesque nec finibus massa. Mauris laoreet justo vitae quam auctor, ac molestie enim scelerisque. Integer diam dolor, tristique vitae leo a, varius elementum leo. Donec vestibulum mi quis sapien porta, eu vehicula dolor bibendum. Proin bibendum scelerisque molestie. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi non diam sit amet purus porttitor vehicula. Quisque sed pharetra tortor, sit amet sollicitudin arcu. Vivamus eu nulla in tortor porttitor sodales.",
      status: "DONE",
    };

    const createdTask = await createTaskUseCase.execute(taskData);

    expect(createdTask).toHaveProperty("id");
    expect(createdTask).toHaveProperty("createdAt");
    expect(createdTask).toHaveProperty("status");
    expect(createdTask.title).toEqual(taskData.title);
    expect(createdTask.content).toEqual(taskData.content);
    expect(createdTask.status).toEqual(taskData.status);
  });

  it("Should be able to create a new task without a status requirement", async () => {
    const taskData: Task = {
      title: "Meu título teste",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed hendrerit lobortis accumsan. Duis non ex nulla. Pellentesque nec finibus massa. Mauris laoreet justo vitae quam auctor, ac molestie enim scelerisque. Integer diam dolor, tristique vitae leo a, varius elementum leo. Donec vestibulum mi quis sapien porta, eu vehicula dolor bibendum. Proin bibendum scelerisque molestie. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi non diam sit amet purus porttitor vehicula. Quisque sed pharetra tortor, sit amet sollicitudin arcu. Vivamus eu nulla in tortor porttitor sodales.",
      status: null,
    };

    const createdTask = await createTaskUseCase.execute(taskData);

    expect(createdTask).toHaveProperty("id");
    expect(createdTask).toHaveProperty("createdAt");
    expect(createdTask).toHaveProperty("status");
    expect(createdTask.title).toEqual(taskData.title);
    expect(createdTask.content).toEqual(taskData.content);
    expect(createdTask.status).toEqual(taskData.status);
  });

  it("Shouldn't be able to create a task without a title", async () => {
    const taskData: Task = {
      title: null,
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed hendrerit lobortis accumsan. Duis non ex nulla. Pellentesque nec finibus massa. Mauris laoreet justo vitae quam auctor, ac molestie enim scelerisque. Integer diam dolor, tristique vitae leo a, varius elementum leo. Donec vestibulum mi quis sapien porta, eu vehicula dolor bibendum. Proin bibendum scelerisque molestie. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi non diam sit amet purus porttitor vehicula. Quisque sed pharetra tortor, sit amet sollicitudin arcu. Vivamus eu nulla in tortor porttitor sodales.",
      status: "PENDING",
    };

    await expect(createTaskUseCase.execute(taskData)).rejects.toEqual(
      new AppError("Its necessary a Title to create a Task", 400)
    );
  });

  it("Shouldn't be able to create a task with a non existing type", async () => {
    const taskData = {
      title: "Meu título teste",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed hendrerit lobortis accumsan. Duis non ex nulla. Pellentesque nec finibus massa. Mauris laoreet justo vitae quam auctor, ac molestie enim scelerisque. Integer diam dolor, tristique vitae leo a, varius elementum leo. Donec vestibulum mi quis sapien porta, eu vehicula dolor bibendum. Proin bibendum scelerisque molestie. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi non diam sit amet purus porttitor vehicula. Quisque sed pharetra tortor, sit amet sollicitudin arcu. Vivamus eu nulla in tortor porttitor sodales.",
      status: "TESTE",
    };

    await expect(
      createTaskUseCase.execute(taskData as ICreateTaskDTO)
    ).rejects.toEqual(new AppError("Unrecognized status type", 400));
  });
});
