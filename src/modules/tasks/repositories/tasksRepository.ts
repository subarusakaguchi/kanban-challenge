import { Task } from "../entities/task";
import {
  ICreateTaskDTO,
  ITasksRepository,
  IUpdateTaskDTO,
} from "./ITasksRepository";

class TasksRepository implements ITasksRepository {
  private tasks: Task[];

  constructor() {
    if (!this.tasks) {
      this.tasks = [
        {
          id: "18087dcc-7a8d-4238-8f1b-7062e7ff2208",
          status: "Done",
          title: "Título 1",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et leo ac nulla tempor commodo nec a nulla. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum sollicitudin egestas fermentum. Vestibulum ut tincidunt nulla. Donec quis ante pulvinar, gravida sem eget, feugiat urna. Phasellus mi magna, vehicula a pretium sit amet, mattis vel nisi. Nulla pellentesque fringilla lacus et tincidunt. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Quisque arcu ex, elementum et dolor vitae, condimentum ultricies est.",
          createdAt: new Date().getTime(),
        },
        {
          id: "18087dcc-7a8d-4238-8f1b-7062e7ff2208",
          status: "Pending",
          title: "Título 2",
          content:
            "Mauris ullamcorper finibus aliquam. Nullam fringilla, lectus bibendum dignissim vulputate, orci libero efficitur massa, at fermentum ex odio ac odio. Pellentesque molestie ornare pretium. Aenean bibendum, enim sit amet iaculis hendrerit, nisl nisl posuere ex, ut tincidunt leo massa in metus. Integer at finibus lacus. Vestibulum at est sit amet ligula fermentum varius at at nulla. Phasellus arcu felis, sollicitudin et justo tempus, porttitor malesuada felis. Vestibulum leo ipsum, mattis id ligula in, tincidunt condimentum orci. Phasellus at nibh quis quam efficitur lobortis eu quis orci. Vivamus accumsan eget orci eu hendrerit. Donec a velit consectetur, ultricies risus eu, laoreet augue. Vivamus et sem fermentum, molestie nulla a, imperdiet nisl. Quisque ultrices libero vitae leo facilisis condimentum.",
          createdAt: new Date().getTime(),
        },
        {
          id: "18087dcc-7a8d-4238-8f1b-7062e7ff2208",
          status: "Review",
          title: "Título 3",
          content:
            "Nunc pharetra rhoncus lacus id scelerisque. Quisque sagittis aliquam nibh, ac cursus justo gravida sit amet. Sed neque enim, ullamcorper eu fringilla ac, sagittis eget augue. Donec vel volutpat lorem. Sed a sodales massa. Cras nisi tellus, scelerisque ut elit sed, tincidunt lacinia sem. Curabitur in ligula congue, laoreet elit at, lobortis lorem. Nunc id elit velit. Fusce mollis neque a commodo molestie. Proin auctor nisi ut orci aliquet, in varius justo pretium. Sed suscipit, augue eu congue interdum, tortor tellus elementum magna, eget fringilla libero nisi nec mi. Curabitur vitae velit condimentum, consectetur dui eu, volutpat lacus. Fusce convallis lacus iaculis quam tristique, sed accumsan lectus dictum.",
          createdAt: new Date().getTime(),
        },
        {
          id: "18087dcc-7a8d-4238-8f1b-7062e7ff2208",
          status: "Doing",
          title: "Título 4",
          content:
            "Donec tincidunt magna ac tellus fermentum fermentum. Donec eu pretium mauris. Donec turpis diam, commodo sit amet euismod quis, tincidunt sit amet mauris. Nulla pulvinar sollicitudin velit a tempus. Donec vitae erat accumsan nulla malesuada porttitor vel nec metus. In tempor in nisi vitae accumsan. In lorem erat, egestas consectetur erat quis, porttitor convallis purus. Duis et molestie mauris. Praesent purus dui, tincidunt quis faucibus vel, condimentum sed diam. In sed lorem quis dolor fermentum semper. Aliquam faucibus ipsum sit amet nisl feugiat, eu scelerisque velit tristique. Nulla ultrices posuere ex sed rutrum. Quisque tincidunt lorem ac malesuada finibus. Ut facilisis aliquet nisi varius consectetur. Donec risus tellus, ornare a nulla et, placerat maximus massa.",
          createdAt: new Date().getTime(),
        },
      ];
    }
  }

  async listAll(): Promise<Task[]> {
    return this.tasks;
  }

  async create(data: ICreateTaskDTO): Promise<Task> {
    const newTask = new Task();

    Object.assign(newTask, data);

    this.tasks.push(newTask);

    return newTask;
  }

  async delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async update(data: IUpdateTaskDTO): Promise<Task> {
    throw new Error("Method not implemented.");
  }
}

export { TasksRepository };
