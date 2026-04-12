import * as express from "express";
import errorHandler from "./middlewares/errorHandling";
import workRoute from "./routes/users";
import prisma from "./config/prisma";

export default class App {
  public app: express.Application;
  constructor() {
    this.app = express();
    this.initializeMiddleWares();
    this.initializeRouters();
    this.initializeError();
    this.initializeGracefulShutdown();
  }

  private initializeMiddleWares(): void {
    this.app.use(express.json());
    this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
      console.log(`${req.path}/${req.method}`);
      next();
    });
  }
  private initializeRouters(): void {
    console.log("routes initialized");
    this.app.get("/", (req: express.Request, res: express.Response) => {
      res.status(200).json({ message: " application is working perfectly" });
    });
    this.app.use("/user", workRoute);
  }
  private initializeError(): void {
    this.app.use(errorHandler);
  }

  private initializeGracefulShutdown(): void {
    const gracefulshutdown = async () => {
      console.log("Shutting down gracefully...");
      await prisma.$disconnect();
      process.exit(0);
    };
    process.on("SIGTERM", gracefulshutdown);
    process.on("SIGINT", gracefulshutdown);
  }

  public listen(port: number): void {
    this.app.listen(port, () => {
      console.log(`application is running on port: ${port}`);
    });
  }
}
