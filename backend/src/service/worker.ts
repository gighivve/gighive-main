import { userRepository } from "../repositories/usersProfile";
import { WorkRepository } from "../repositories/worker";

export interface WorkerData {
  userId: { id: string; email: string; role: string };
  bio?: string;
  rating?: number;
  services: any[];
}

export class WorkerService {
  constructor(private repository: WorkRepository) {}
  async createWorkProfile(data: WorkerData) {
    const { userId, bio } = data;
    const profile = await this.repository.create_work(userId.id, bio);
    return profile;
  }
}
