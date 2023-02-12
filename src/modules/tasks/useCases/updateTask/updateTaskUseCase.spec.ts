import { Task } from "@modules/tasks/entities/Task";
import { InMemoryTasksRepository } from "@modules/tasks/repositories/implementations/InMemoryTasksRepository";
import { TaskStatus } from "@prisma/client";
import { AppError } from "@shared/errors/AppError";
import { randomUUID } from "crypto";
import { UpdateTaskUseCase } from "./updateTaskUseCase";

let inMemoryTasksRepository: InMemoryTasksRepository;
let updateTaskUseCase: UpdateTaskUseCase;

describe("Update task", () => {
  beforeEach(() => {
    inMemoryTasksRepository = new InMemoryTasksRepository();
    updateTaskUseCase = new UpdateTaskUseCase(inMemoryTasksRepository);
  });

  it("Should be able to update all infos in an existing task", async () => {
    const taskData: Task = {
      title: "Meu título teste",
      content:
        "Pellentesque viverra accumsan enim quis ultrices. Sed facilisis vulputate tincidunt. Vestibulum a erat eget leo commodo pulvinar. Nunc semper lacus quis venenatis pellentesque. Pellentesque malesuada, lectus at gravida fringilla, nisl velit ornare magna, in venenatis tortor diam vel dolor. In vitae ex lectus. Cras et semper nibh. Sed ut ornare est.",
      status: "DONE",
    };

    const createdTask = await inMemoryTasksRepository.create(taskData);

    const newTaskData: Task = {
      title: "Novo Título",
      content:
        "Morbi facilisis vulputate dolor quis semper. Proin vestibulum fermentum diam et varius. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tristique arcu lectus, vel hendrerit erat tempus sed. Aenean a ligula a sem ultricies interdum ac id orci. Phasellus tristique at arcu id euismod. Quisque sollicitudin, mi vel ultrices posuere, felis ligula pretium justo, non vulputate nisi risus at velit. Phasellus vitae tellus lobortis, sodales est ac, finibus tortor.",
      status: "DONE",
    };

    const updatedTask = await updateTaskUseCase.execute(
      createdTask.id,
      newTaskData
    );

    expect(updatedTask.id).toEqual(createdTask.id);
    expect(updatedTask.title).toEqual(newTaskData.title);
    expect(updatedTask.status).toEqual(newTaskData.status);
    expect(updatedTask.content).toEqual(newTaskData.content);
  });

  it("Should be able to update an unique info in an existing task", async () => {
    const taskData: Task = {
      title: "Meu título teste",
      content:
        "Pellentesque viverra accumsan enim quis ultrices. Sed facilisis vulputate tincidunt. Vestibulum a erat eget leo commodo pulvinar. Nunc semper lacus quis venenatis pellentesque. Pellentesque malesuada, lectus at gravida fringilla, nisl velit ornare magna, in venenatis tortor diam vel dolor. In vitae ex lectus. Cras et semper nibh. Sed ut ornare est.",
      status: "DONE",
    };

    const createdTask = await inMemoryTasksRepository.create(taskData);

    const newContent =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vitae purus nulla. Pellentesque eleifend lectus risus. Maecenas ut facilisis urna, at suscipit lectus. Fusce tincidunt egestas dui, vitae consequat orci efficitur id. Suspendisse ut molestie orci, a iaculis felis. Vivamus consequat id odio at consectetur. Morbi semper hendrerit urna, non semper nibh. Pellentesque ut finibus lacus, ac suscipit dui. Pellentesque lectus enim, volutpat a consequat eget, consectetur sit amet turpis. Pellentesque vel gravida justo, ut gravida lorem.";

    const updatedTask = await updateTaskUseCase.execute(createdTask.id, {
      content: newContent,
    });

    expect(updatedTask.id).toEqual(createdTask.id);
    expect(updatedTask.content).toEqual(newContent);
  });

  it("Should not update a non existing task", async () => {
    const fakeData: Task = {
      title: "Título falso",
      content: "Conteúdo falso",
      status: "PENDING",
    };

    const fakeId = randomUUID();

    await expect(updateTaskUseCase.execute(fakeId, fakeData)).rejects.toEqual(
      new AppError("Task not found", 404)
    );
  });

  it("Should not update an empty task title", async () => {
    const fakeData: Task = {
      title: "Meu título teste",
      content:
        "Pellentesque viverra accumsan enim quis ultrices. Sed facilisis vulputate tincidunt. Vestibulum a erat eget leo commodo pulvinar. Nunc semper lacus quis venenatis pellentesque. Pellentesque malesuada, lectus at gravida fringilla, nisl velit ornare magna, in venenatis tortor diam vel dolor. In vitae ex lectus. Cras et semper nibh. Sed ut ornare est.",
      status: "DONE",
    };

    const createdTask = await inMemoryTasksRepository.create(fakeData);

    const fakeStatus = "TESTE" as TaskStatus;

    await expect(
      updateTaskUseCase.execute(createdTask.id, { status: fakeStatus })
    ).rejects.toEqual(new AppError("Unrecognized status type", 400));
  });

  it("Should not update a non existing task status", async () => {
    const fakeData: Task = {
      title: "Meu título teste",
      content:
        "Pellentesque viverra accumsan enim quis ultrices. Sed facilisis vulputate tincidunt. Vestibulum a erat eget leo commodo pulvinar. Nunc semper lacus quis venenatis pellentesque. Pellentesque malesuada, lectus at gravida fringilla, nisl velit ornare magna, in venenatis tortor diam vel dolor. In vitae ex lectus. Cras et semper nibh. Sed ut ornare est.",
      status: "DONE",
    };

    const createdTask = await inMemoryTasksRepository.create(fakeData);

    const wrongTitle = "";

    await expect(
      updateTaskUseCase.execute(createdTask.id, { title: wrongTitle })
    ).rejects.toEqual(new AppError("A task must have a title", 400));
  });
});
