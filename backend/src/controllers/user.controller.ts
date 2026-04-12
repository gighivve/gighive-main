import { Request, Response } from "express";
import { userService } from "../service/user";
import * as jwt from "jsonwebtoken";

export class users {
  constructor(private userServi: userService) {}

  public profile_info = async (req: Request, res: Response) => {
    try {
      const userProfile = await this.userServi.AccountInfomation(req.params);
      res.status(200).json({ message: "most searches", data: userProfile });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // register new account 
  public Createprofile = async (req: Request, res: Response) => {
    try {
      const userProfile = await this.userServi.createAccount(req.body);
      const token = jwt.sign({ id: userProfile.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
      res.status(200).json({ message: "welcome to the hive", token,  userProfile });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  public updateProfile = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const updatedProfile = await this.userServi.updateAccount(id as string, updateData);
      res.status(200).json({ message: "Profile updated successfully", data: updatedProfile });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  public deleteProfile = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await this.userServi.deleteAccount(id as string);
      res.status(200).json({ message: "Profile deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
}
