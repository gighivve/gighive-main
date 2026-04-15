// import prisma from "../config/prisma";
import prisma from "../config/prisma";
import { UserDataType } from "../lib/types";

export class userRepository {
  // using the email and id to get user  from the database
  async get(data: { id: string; email: string }) {
    return await prisma.user.findUnique({
      where: { id: data.id },
    });
  }
  async create(data: UserDataType, referralCode: string ) {
    const savedData = await prisma.user.create({
      data: {
        ...data,
        referralCode,
        wallet: {
          create: {
            balance: 0,
          },
        },
      },
      include: {
        wallet: true,
      },
    });
    console.log(savedData);
    return savedData;
  }

  async update(id: string, data: Partial<UserDataType>) {
    return await prisma.user.update({
      where: { id },
      data,
    });
  }
  async delete(id: string) {
    return await prisma.user.delete({
      where: { id },
    });
  }
  async checkEmail(email: UserDataType["email"]) {
    return await prisma.user.findUnique({ where: { email } });
  }
  async checkPhone(phone: UserDataType["phone"]) {
    return await prisma.user.findUnique({ where: { phone } });
  }
  async saveOtp(data: UserDataType) {
    return {};
  }

  // async catergorySearch(search:string) {
  //   return prisma.skill.findMany({
  //     where: {
  //       name: search
  //     }
  //   })
  // }
}
