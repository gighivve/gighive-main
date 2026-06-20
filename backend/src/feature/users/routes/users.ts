import { Router } from "express";
import auth from "../../../middlewares/auth";
import { Account } from "../controllers/account";
import { UserService } from "../services/authentication";


const userRoute = Router();
const service = new UserService();
const user = new Account(service);

// user create enpoints
userRoute.post("/register", user.Createprofile);
userRoute.put("/update/profile/:id", auth.authenticate, user.updateProfile);
userRoute.delete("/delete/profile/:id", auth.authenticate, user.deleteProfile);


export default userRoute;
