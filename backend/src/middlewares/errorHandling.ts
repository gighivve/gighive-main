import { Request, Response, NextFunction } from "express";
export interface AppError extends Error {
  status: number;
}
export default function errorHandler(err: AppError, req: Request, res: Response, next: NextFunction) {
  res.status(err.status || 500).json({
    message: err.message || "Internal service error",
  });
}
