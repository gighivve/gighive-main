import { Request, Response } from "express";
import { UserService } from "../services/authentication";
import { ProfileServices } from "../services/profile";

export class Profile {
  constructor(private profile: ProfileServices) {}

  //   get information about profile
  public aboutUser = async (req: Request, res: Response) => {
    try {
      const userProfile = await this.profile.AccountInfomation(req.params);
      res.status(200).json({ message: "most searches", data: userProfile });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  //   userSkill
  //   status
  //   ranking
  //   catelogue
  //
}
