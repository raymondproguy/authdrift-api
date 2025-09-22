// ./app/dev.controller.ts

import { Request, Response } from "express";
import {
  createDev,
  getDevByName,
  updateDev,
  deleteDev,
  registerDev,
  loginDev
} from "../services/dev.service";
import { logger } from "../utils/logger";

export const handleRegister = async(req:Request, res:Response) =>{
  try {
    const {dev, token} = await registerDev(req.body);
    logger.success(`Dev registered: ${dev.email}`);
    res.status(201).json({
      success: true,
      data:{
        _id: dev._id,
        email: dev.email,
        devname: dev.devname,
        company: dev.company,
        isActive: dev.isActive,
        createdAt: dev.createdAt
      },
      token,
      message: "Registion successful"
    });
  } catch (error: any) {
    logger.error(`Register error: ${error.message}`);
    res.status(400).json({
      success: false,
      error:error.message
    });
  }
};

export const handleLogin = async (req:Request, res:Response) =>{
  try {
    const {email,password} = req.body;
     const {dev, token} = await loginDev(email,password);
    logger.success(`Dev Logged in: ${dev.email}`);
    res.status(201).json({
      success: true,
      data:{
        _id: dev._id,
        email: dev.email,
        devname: dev.devname,
        company: dev.company,
        isActive: dev.isActive,
        createdAt: dev.createdAt
      },
      token,
      message: "Login successful"
    });
  } catch (error: any) {
    logger.error(`Login error: ${error.message}`);
    res.status(400).json({
      success: false,
      error:error.message
    });
  }
};

export const handleGetProfile = async (req:Request, res:Response) =>{
  try {
    const dev = await getDevByName((req as any).dev.devname);
    if(!dev) {
      return res.status(404).json({
        success: false,
        error: "Dev not found"
      });
    }
    logger.info(`Profile for Dev: ${dev.devname}`);
    res.status(200).json({
      success: true,
      data: dev
    });
  } catch (error: any) {
    logger.error(`Get profile error: ${error.message}`);
    res.status(400).json({
      success: false,
      error:error.message
    });
  }
};

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
