// ./app/middleware/validation.ts

import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { logger } from '../utils/logger';

export const validateProject = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    name: Joi.string().max(50).required().messages({
      'string.empty': 'Project name is required',
      'string.max': 'Project name cannot exceed 50 characters'
    }),
    description: Joi.string().max(500).optional().messages({
      'string.max': 'Description cannot exceed 500 characters'
    }),
    isActive: Joi.boolean().optional()
  });

  const { error } = schema.validate(req.body, { abortEarly: false });
  
  if (error) {
    logger.warn(`Validation failed: ${error.details.map(d => d.message).join(', ')}`);
    return res.status(400).json({ 
      success: false,
      error: error.details.map(detail => detail.message).join(', ')
    });
  }
  
  logger.debug('Validation passed');
  next();
};
