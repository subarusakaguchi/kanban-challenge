import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteTaskUseCase } from "./deleteTaskUseCase";

class DeleteTaskController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteTaskUseCase = container.resolve(DeleteTaskUseCase);

    try {
      await deleteTaskUseCase.execute(id);

      return res.json({ message: "Deleted" });
    } catch (err) {
      return res.json(err);
    }
  }
}

export { DeleteTaskController };
