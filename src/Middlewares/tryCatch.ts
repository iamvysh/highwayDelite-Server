import { Request, Response, NextFunction } from "express";

export const tryCatchMiddleware = (handler: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res, next);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({
        status: "failure",
        message: "something went wrong",
        error_message: error.message,
      });
    }
  };
};
