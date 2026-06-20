import { Request, Response } from "express";

export class Transcations {
  // all transction HTTP level request handling
  // history
  public history = async (req: Request, res: Response) => {
    try {
      res.status(200).json({ message: "succesful" });
    } catch (error) {
      res.status(401).json({ message: "" });
    }
  };
  // pending
  // cancelled/rejected
}
