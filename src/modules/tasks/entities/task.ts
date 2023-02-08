import { randomUUID } from "crypto";

type TaskPossibleStatus = "Pending" | "Doing" | "Review" | "Done";

class Task {
  id: string;
  status: TaskPossibleStatus;
  title: string;
  content?: string;
  createdAt: number;

  constructor() {
    if (!this.id) {
      this.id = randomUUID();
    }
  }
}

export { Task };
