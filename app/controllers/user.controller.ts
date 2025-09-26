// ./app/user.controller.ts

import { Request, Response } from "express";
import {
  createUser,
  getUserByName,
  getAllUsers,
  updateUser,
  deleteUser,
  registerUser,
  loginUser
} from "../services/user.service";
import { logger } from "../utils/logger";

export const handleRegister = async(req:Request, res:Response) =>{
  try {
    const {user, token} = await registerUser(req.body);
    logger.success(`User registered: ${user.email}`);
    res.status(201).json({
      success: true,
      data:{
        _id: user._id,
        email: user.email,
        username: user.username,
        isActive: user.isActive,
        createdAt: user.createdAt
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
     const {user, token} = await loginUser(email,password);
    logger.success(`User Logged in: ${user.email}`);
    res.status(201).json({
      success: true,
      data:{
        _id: user._id,
        email: user.email,
        username: user.username,
        isActive: user.isActive,
        createdAt: user.createdAt
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
    const user = await getUserByName((req as any).user.username);
    if(!user) {
      return res.status(404).json({
        success: false,
        error: "Dev not found"
      });
    }
    logger.info(`Profile for User: ${user.username}`);
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error: any) {
    logger.error(`Get profile error: ${error.message}`);
    res.status(400).json({
      success: false,
      error:error.message
    });
  }
};

export const handleCreateUser = async (req: Request, res: Response) => {
  try {
    const user = await createUser(req.body);
    logger.success(`User created: ${user.email}`);
    res.status(201).json({
      success: true,
      data: user
    });
  } catch (error: any) {
    logger.error(`Create user error: ${error.message}`);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const handleGetAllUser = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    logger.info(`Fetched ${users.length} users`);
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error: any) {
    logger.error(`Get all user error: ${error.message}`);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};


export const handleGetDevByName = async (req: Request, res: Response) => {
  try {
    const user = await getUserByName(req.body);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found"
      });
    }
    logger.info(`Fetched user: ${user.username}`);
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error: any) {
    logger.error(`Get error by ID error: ${error.message}`);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const handleUpdateDev = async (req: Request, res: Response) => {
  try {
    const user = await updateUser(req.params.id, req.body);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found"
      });
    }
    logger.success(`User updated: ${user.email}`);
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error: any) {
    logger.error(`Update user error: ${error.message}`);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const handleDeleteUser = async (req: Request, res: Response) => {
  try {
    const user = await deleteUser(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found"
      });
    }
    logger.warn(`User deleted: ${user.username}`);
    res.status(200).json({
      success: true,
      data: {},
      message: 'User deleted successfully'
    });
  } catch (error: any) {
    logger.error(`Delete user error: ${error.message}`);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
