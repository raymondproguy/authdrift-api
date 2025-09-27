import {Request, Response } from "express";
import { generateJWT } from "../services/oauth.user";
import { logger } from "../utils/logger";

export const handleAuthSuccess = (req: Request, res: Response) => {
  const user = req.user as any;
  const token = generateJWT(dev._id);

  logger.success(`Social login successful: ${user.email}`);

  // Redirect to frontend with token
  res.redirect(`${process.env.FRONTEND_URL}/auth/success?token=${token}&email=${user.email}`);
};

export const handleAuthFailure = (req: Request, res: Response) => {
  logger.error('Social login failed');
  res.redirect(`${process.env.FRONTEND_URL}/auth/failure`);
};

export const handleLogout = (req: Request, res: Response) => {
  req.logout(() => {
    logger.info('User logged out');
    res.json({ success: true, message: 'Logged out successfully' });
  });
};
