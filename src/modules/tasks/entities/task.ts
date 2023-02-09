import { Prisma, TaskStatus } from "@prisma/client";

class Task implements Prisma.TaskUncheckedCreateInput {
  id?: string;
  status: TaskStatus;
  title: string;
  content: string;
  createdAt?: string | Date;
}

export { Task };
