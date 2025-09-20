// ./app/middleware/request.logger.ts

import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  
  res.on("finish", () => {
    const duration = Date.now() - start;
    const statusCode = res.statusCode;
    
    // Color the status code based on the range
    let coloredStatusCode;
    if (statusCode >= 400) {
      coloredStatusCode = statusCode.toString().red;
    } else if (statusCode >= 300) {
      coloredStatusCode = statusCode.toString().yellow;
    } else {
      coloredStatusCode = statusCode.toString().green;
    }
    
    logger.info(`${req.method} ${req.originalUrl} ${coloredStatusCode} ${duration}ms`.gray);
  });
  
  next();
};
