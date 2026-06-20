// import prisma from "../config/prisma";

import prisma from "../../../config/prisma";
import { UserDataType } from "../../../lib/types";

// using the email and id to get user  from the database
export async function getAaccountInformation(data: {
  id: string;
  email: string;
}) {
  return await prisma.user.findUnique({
    where: { id: data.id },
  });
}

export async function createAccount(data: UserDataType, referralCode: string) {
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

// function to update Account
export async function updateAccount(id: string, data: Partial<UserDataType>) {
  return await prisma.user.update({
    where: { id },
    data,
  });
}

// function to delete Account
export async function deleteUserAccount(id: string) {
  return await prisma.user.delete({
    where: { id },
  });
}

export async function checkEmail(email: UserDataType["email"]) {
  return await prisma.user.findUnique({ where: { email } });
}
export async function checkPhone(phone: UserDataType["phone"]) {
  return await prisma.user.findUnique({ where: { phone } });
}
export async function saveOtp(data: UserDataType) {
  return {};
}

// async catergorySearch(search:string) {
//   return prisma.skill.findMany({
//     where: {
//       name: search
//     }
//   })
// }
