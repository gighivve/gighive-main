import { UserDataType } from "../../../lib/types";
import { checkFields } from "../../../lib/helper";
import * as bcrypt from "bcrypt";
import { randomBytes } from "crypto";
import { checkEmail, createAccount, deleteUserAccount, updateAccount } from "../respository/account";

export class UserService {
  
  async createAccount(data: UserDataType) {
    // checking and validating all input from request
    if (!!checkFields(data)) throw new Error(checkFields(data));

    // check if the user with the req email already
    // throw error (message) if user exist
    const existingUser = await checkEmail(data.email);
    const message = "user with email already exist. please try logging in";
    if (!!existingUser) throw new Error(message);

    // hash password
    const pasword: UserDataType["password"] = data.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(pasword, salt);

    // referraid generator
    const userName: string = `@${data.firstName}`;
    const referralCode = `${userName}${randomBytes(2).toString("hex")}`;

    // if the user data saves then return the saved data
    return await createAccount({ ...data, password: hashedPassword, userName }, referralCode);
  }





 
  

  // update user data
  async updateAccount(id: string, data: Partial<UserDataType>) {
    if (!id) {
      throw new Error("User ID is required");
    }
    return await updateAccount(id, data);
  }




  async deleteAccount(id: string) {
    if (!id) {
      throw new Error("User ID is required");
    }
    return await deleteUserAccount(id);
  }
}
