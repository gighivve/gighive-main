import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { UserService } from "../services/authentication";

export class Account {
  constructor(private userServi: UserService) {}

  // register new account
  public Createprofile = async (req: Request, res: Response) => {
    try {
      const userProfile = await this.userServi.createAccount(req.body);
      const token = jwt.sign({ id: userProfile.id }, process.env.JWT_SECRET as string, { expiresIn: "7d" });
      res.status(200).json({ message: "welcome to the hive", token, userProfile });
    } catch (error:any) {
      res.status(500).json({ error: error.message });
    }
  };

  // update pofile
  public updateProfile = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const updatedProfile = await this.userServi.updateAccount(id as string, updateData);
      res.status(200).json({ message: "Profile updated successfully", data: updatedProfile });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  // delete users account 
  public deleteProfile = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await this.userServi.deleteAccount(id as string);
      res.status(200).json({ message: "Profile deleted successfully" });
    } catch (error:any) {
      res.status(400).json({ error: error.message });
    }
  };
}
