import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetAllTasksUseCase } from "./getAllTasksUseCase";

class GetAllTasksContoller {
  async handle(req: Request, res: Response): Promise<Response> {
    const getAllTasksUseCase = container.resolve(GetAllTasksUseCase);

    const allTasks = await getAllTasksUseCase.execute();

    return res.status(200).json(allTasks);
  }
}

export { GetAllTasksContoller };
