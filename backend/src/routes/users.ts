import { Router } from "express";
import { userRepository } from "../repositories/usersProfile";
import { userService } from "../service/userProfile";
import { users } from "../controllers/usersprofile";
import auth from "../middlewares/auth";
import { WorkRepository } from "../repositories/worker";
import { WorkerService } from "../service/worker";
import { Workers } from "../controllers/workers";

const userRoute = Router();
const repo = new userRepository();
const service = new userService(repo);
const user = new users(service);

// user create enpoints
userRoute.get("/profile/:id", user.profile_info);
userRoute.post("/register", user.Createprofile);
userRoute.put("/update/profile/:id", auth.authenticate, user.updateProfile);
userRoute.delete("/delete/profile/:id", auth.authenticate, user.deleteProfile);

const wRepo = new WorkRepository();
const wservice = new WorkerService(wRepo);
const worker = new Workers(wservice);

userRoute.post("/create/worker", auth.authenticate, worker.createProfile);

export default userRoute;
