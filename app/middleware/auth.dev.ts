import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../services/dev.service';
import { logger } from '../utils/logger';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Access token required'
      });
    }

    const decoded = verifyToken(token);
    (req as any).user = decoded;
    
    logger.debug(`Token authenticated for user: ${decoded.id}`);
    next();
  } catch (error: any) {
    logger.error(`Authentication error: ${error.message}`);
    res.status(403).json({
      success: false,
      error: 'Invalid or expired token'
    });
  }
};

export const optionalAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (token) {
    try {
      const decoded = verifyToken(token);
      (req as any).user = decoded;
      logger.debug(`Optional auth - user: ${decoded.id}`);
    } catch (error) {
      // Don't fail, just continue without user
      logger.debug('Optional auth - invalid token, continuing without user');
    }
  }

  next();
};
