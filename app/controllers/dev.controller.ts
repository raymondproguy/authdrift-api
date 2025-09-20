import { Request, Response } from "express";
import {
  createDev,
  getDevByName,
  updateDev,
  deleteDev
} from "../services/dev.service";
import { logger } from "../utils/logger";

export const handleCreateDev = async (req: Request, res: Response) => {
  try {
    const dev = await createDev(req.body);
    logger.success(`Dev user created: ${dev.email}`);
    res.status(201).json({
      success: true,
      data: dev
    });
  } catch (error: any) {
    logger.error(`Create dev error: ${error.message}`);
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};

/*
export const handleGetAllDevs = async (req: Request, res: Response) => {
  try {
    const devs = await getAllDevs();
    logger.info(`Fetched ${devs.length} dev users`);
    res.status(200).json({
      success: true,
      count: devs.length,
      data: devs
    });
  } catch (error: any) {
    logger.error(`Get all devs error: ${error.message}`);
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};
*/

export const handleGetDevByName = async (req: Request, res: Response) => {
  try {
    const dev = await getDevByName(req.body);
    if (!dev) {
      return res.status(404).json({ 
        success: false,
        error: "Dev user not found" 
      });
    }
    logger.info(`Fetched dev user: ${dev.devname}`);
    res.status(200).json({
      success: true,
      data: dev
    });
  } catch (error: any) {
    logger.error(`Get dev by ID error: ${error.message}`);
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};

export const handleUpdateDev = async (req: Request, res: Response) => {
  try {
    const dev = await updateDev(req.params.id, req.body);
    if (!dev) {
      return res.status(404).json({ 
        success: false,
        error: "Dev user not found" 
      });
    }
    logger.success(`Dev user updated: ${dev.email}`);
    res.status(200).json({
      success: true,
      data: dev
    });
  } catch (error: any) {
    logger.error(`Update dev error: ${error.message}`);
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};

export const handleDeleteDev = async (req: Request, res: Response) => {
  try {
    const dev = await deleteDev(req.params.id);
    if (!dev) {
      return res.status(404).json({ 
        success: false,
        error: "Dev user not found" 
      });
    }
    logger.warn(`Dev user deleted: ${dev.devname}`);
    res.status(200).json({
      success: true,
      data: {},
      message: 'Dev user deleted successfully'
    });
  } catch (error: any) {
    logger.error(`Delete dev error: ${error.message}`);
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};
