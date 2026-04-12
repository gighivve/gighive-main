import prisma from "../config/prisma";

export class WorkRepository {
  async create_work(userId: string, data) {
    return await prisma.user.update({
      where: { id: userId },
      data: {
        role: "WORKER",
        workerprofile: {
          create: {
            bio: data,
          },
        },
      },
      include: {
        workerprofile: true,
      },
    });
  }

  //   async createServices() {
  //     return prisma.service
  // .createMany({
  //     data:{
  //         workerId:
  //     }
  // })
  //   }
}
  