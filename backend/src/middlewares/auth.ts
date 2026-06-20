import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import prisma from "../config/prisma";

interface jwtUserPayload extends jwt.JwtPayload {
  id: string;
  email: string;
  role: string;
}

declare module "express-serve-static-core" {
  interface Request {
    user?: { id: string; email: string; role: string };
  }
}

class AuthmiddleWare {
  private secret: string;
  constructor(secret: string) {
    this.secret = secret;
  }

  //   authenication for incoming request
  //   verify the user before allowing request go through
  public authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader:string | undefined = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "user not authenticated" });
    }
    // token
    const token = authHeader.split(" ")[1];
    try {
      const decode = jwt.verify(token, this.secret) as jwtUserPayload;
      if (typeof decode !== "object" || "userId" in decode) {
        return res.status(403).json({ message: "invalid token" });
      }

      const user = await prisma.user.findUnique({
        where: { id: decode.id as string },
      });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      req.user = { id: user.id, role: user.role, email: user.email };
      next();
    } catch (error) {
      return res.status(403).json({ message: "invalid or exipired token" });
    }
  };

  // route authorization
  // prevent user without the right role to access routes
  public authorization = (...role: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
      if (!req.user) {
        return res.status(401).json({ message: "user not authenticated" });
      }
      if (!role.includes(req.user.role)) {
        return res.status(403).json({ message: "access denied" });
      }
      next();
    };
  };
}

const auth = new AuthmiddleWare(process.env.JWT_SECRET as string);
export default auth; 
