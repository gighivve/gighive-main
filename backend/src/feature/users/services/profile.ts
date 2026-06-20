import { getAaccountInformation } from "../respository/account";


export class ProfileServices {

  // get users informaion
  async AccountInfomation(data: any) {
    const { id, email } = data;
    const infos = await getAaccountInformation({ id, email });
    if (!!infos) return infos;
    else throw new Error("invalid user credentials");
  }
}
