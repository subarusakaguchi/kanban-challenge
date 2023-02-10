import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateTaskUseCase } from "./updateTaskUseCase";

class UpdateTaskController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { title, content, status } = req.body;

    const updateTaskUseCase = container.resolve(UpdateTaskUseCase);

    try {
      const updatedTask = await updateTaskUseCase.execute(id, {
        id,
        title,
        content,
        status,
      });

      return res.json(updatedTask);
    } catch (err) {
      console.log(err);
    }
  }
}

export { UpdateTaskController };
