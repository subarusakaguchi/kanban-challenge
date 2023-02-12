import { Task } from "@modules/tasks/entities/Task";
import { InMemoryTasksRepository } from "@modules/tasks/repositories/implementations/InMemoryTasksRepository";
import { GetAllTasksUseCase } from "./getAllTasksUseCase";

let getAllTasksUseCase: GetAllTasksUseCase;
let inMemoryTasksRepository: InMemoryTasksRepository;

describe("Delete task", () => {
  beforeEach(() => {
    inMemoryTasksRepository = new InMemoryTasksRepository();
    getAllTasksUseCase = new GetAllTasksUseCase(inMemoryTasksRepository);
  });

  it("Should be able to delete a task by id", async () => {
    const tasksData: Task[] = [
      {
        title: "Meu título teste 1",
        content:
          "Phasellus at risus convallis, iaculis odio et, auctor magna. Praesent placerat aliquam urna eu fringilla. Phasellus bibendum ultricies mi in suscipit. Duis fringilla dui sit amet arcu ultrices, sit amet placerat velit aliquam. Duis quis dignissim mi, eu accumsan tortor. Aliquam vehicula, turpis a congue cursus, augue urna bibendum odio, eu mattis velit augue ut risus. Vestibulum varius consectetur dignissim. Nunc non dictum purus. Etiam sit amet lorem eget lacus luctus egestas vitae eget libero. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Proin non ullamcorper velit. Sed dui elit, auctor ac velit id, facilisis posuere odio. Duis non finibus tortor. Sed tincidunt mauris eget lorem rutrum venenatis at at ligula.",
        status: "REVIEW",
      },
      {
        title: "Meu título teste 2",
        content:
          "Fusce consectetur blandit mauris id aliquet. Nullam aliquam nulla ut orci laoreet, sit amet scelerisque risus pulvinar. Donec eget magna auctor, interdum velit id, auctor nunc. Praesent id faucibus augue. Duis in nisl arcu. Fusce lacus nunc, ornare bibendum quam id, dapibus dictum neque. Nullam suscipit risus sed neque vehicula euismod. Praesent maximus, erat a mollis suscipit, sapien dui maximus metus, id dignissim ipsum mauris feugiat metus. Phasellus felis turpis, pharetra non libero sit amet, ultrices malesuada eros. Aliquam ornare ligula sit amet metus ultrices, vel ultrices purus pharetra.",
        status: "REVIEW",
      },
      {
        title: "Meu título teste 3",
        content:
          "Suspendisse vel blandit neque. Ut sed dapibus nulla. Sed vitae sem est. Aenean ac imperdiet nisi. Proin id dolor sapien. Morbi auctor bibendum tellus ut ultrices. Morbi suscipit, dolor sed ultricies vestibulum, nunc quam ornare mi, et elementum urna turpis vel elit. Proin at erat nec leo tincidunt pellentesque eu eget lorem. Donec molestie non lorem molestie ultricies.",
        status: "REVIEW",
      },
    ];

    await inMemoryTasksRepository.create(tasksData[0]);
    await inMemoryTasksRepository.create(tasksData[1]);
    await inMemoryTasksRepository.create(tasksData[2]);

    const allTasks = await getAllTasksUseCase.execute();

    expect(allTasks[0].content).toEqual(tasksData[0].content);
    expect(allTasks[1].content).toEqual(tasksData[1].content);
    expect(allTasks[2].content).toEqual(tasksData[2].content);
  });
});
