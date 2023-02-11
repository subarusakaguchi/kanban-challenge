import { Task } from "@modules/tasks/entities/Task";
import { InMemoryTasksRepository } from "@modules/tasks/repositories/implementations/InMemoryTasksRepository";
import { CreateTaskUseCase } from "./createTaskUseCase";

let createTaskUseCase: CreateTaskUseCase;
let inMemoryTasksRepository: InMemoryTasksRepository;

describe("Create Task", () => {
  beforeEach(() => {
    inMemoryTasksRepository = new InMemoryTasksRepository();
    createTaskUseCase = new CreateTaskUseCase(inMemoryTasksRepository);
  });

  it("Should be able to create a new task", async () => {
    const dataTask: Task = {
      title: "Meu título teste",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed hendrerit lobortis accumsan. Duis non ex nulla. Pellentesque nec finibus massa. Mauris laoreet justo vitae quam auctor, ac molestie enim scelerisque. Integer diam dolor, tristique vitae leo a, varius elementum leo. Donec vestibulum mi quis sapien porta, eu vehicula dolor bibendum. Proin bibendum scelerisque molestie. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi non diam sit amet purus porttitor vehicula. Quisque sed pharetra tortor, sit amet sollicitudin arcu. Vivamus eu nulla in tortor porttitor sodales.",
      status: "PENDING",
    };

    await createTaskUseCase.execute(dataTask);
  });
});
