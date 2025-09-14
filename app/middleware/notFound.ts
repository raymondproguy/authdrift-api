import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  logger.warn(`Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404);
  next(new Error(`Not found - ${req.originalUrl}`));
};
