import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateTaskUseCase } from "./createTaskUseCase";

class CreateTaskController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { title, content, status } = req.body;

    const createTaskUseCase = container.resolve(CreateTaskUseCase);

    const newTask = await createTaskUseCase.execute({ title, content, status });

    return res.status(200).json(newTask);
  }
}

export { CreateTaskController };