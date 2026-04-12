import { UserDataType } from "../lib/types";
import { userRepository } from "../repositories/users";
import { checkFields } from "../lib/helper";
import * as bcrypt from "bcrypt";
import { randomBytes } from "crypto";

export class userService {
  constructor(private userRepo: userRepository) {}
  async createAccount(data: UserDataType) {
    // checking and validating all input from request
    if (!!checkFields(data)) throw new Error(checkFields(data));

    // check if the user with the req email already
    // throw error (message) if user exist
    const existingUser = await this.userRepo.checkEmail(data.email);
    const message = "user with email already exist. please try logging in"
    if (!!existingUser) throw new Error(message);

    // hash password 
    const pasword: UserDataType["password"] = data.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(pasword, salt);

    // referraid generator
    const userName: string = `@${data.firstName}`;
    const referralCode = `${userName}${randomBytes(2).toString("hex")}`;

    // if the user data saves then return the saved data
    return this.userRepo.create({ ...data, password: hashedPassword, userName }, referralCode);
  }


  // get users informaion
  async AccountInfomation(data: any) {
    const { id, email } = data;
    const infos = await this.userRepo.get({ id, email });
    if (!!infos) return infos;
    else throw new Error("invalid user credentials");
  }


  // update user data
  async updateAccount(id: string, data: Partial<UserDataType>) {
    if (!id) {
      throw new Error("User ID is required");
    }
    return await this.userRepo.update(id, data);
  }

  async deleteAccount(id: string) {
    if (!id) {
      throw new Error("User ID is required");
    }
    return await this.userRepo.delete(id);
  }
}
