import { Request, Response } from "express";
import { WorkerService } from "../service/worker";

export class Workers {
  constructor(private workservice: WorkerService) {}
  public createProfile = async (req: Request, res: Response) => {
    try {
      const userId = req.user;
      const workerdetails = await this.workservice.createWorkProfile({...req.body,userId});
      res.status(200).json({
        message: "updated to work Account succefully ",
        data: workerdetails,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
}
