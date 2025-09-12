// .app/middleware/requestLogger.ts 

import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";
import { date } from "joi";

export const requestLogger = (req:Request, res:Response, next:NextFunction) =>{
  const start = Date.now();
  res.on("finish", () =>{
    const duration = Date.now()-start;
    const statusColor = res.statusCode >= 400 ? "red":
      res.statusCode >= 300 ? "yellow" : "green";
    res.statusText = res.statusCode.toString()
    [statusColor];
    console.log(${req.method} ${req.originalUrl} ${statusText} ${duration}ms .gray);
  });
  next()
};
