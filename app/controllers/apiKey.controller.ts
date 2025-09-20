import { Request, Response } from "express";
import {
  generateApiKey,
  getApiKeysByDev,
  revokeApiKey,
} from "../services/apiKey.service";
import { logger } from "../utils/logger";

export const handleGenerateApiKey = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const apiKey = await generateApiKey(req.params.devId, name);
    
    logger.success(`API key generated for dev: ${req.params.devId}`);
    res.status(201).json({
      success: true,
      data: apiKey,
      message: 'API key generated successfully'
    });
  } catch (error: any) {
    logger.error(`Generate API key error: ${error.message}`);
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};

export const handleGetApiKeys = async (req: Request, res: Response) => {
  try {
    const apiKeys = await getApiKeysByDev(req.params.devId);
    res.status(200).json({
      success: true,
      count: apiKeys.length,
      data: apiKeys
    });
  } catch (error: any) {
    logger.error(`Get API keys error: ${error.message}`);
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};

export const handleRevokeApiKey = async (req: Request, res: Response) => {
  try {
    const apiKey = await revokeApiKey(req.params.keyId, req.params.devId);
    if (!apiKey) {
      return res.status(404).json({ 
        success: false,
        error: "API key not found" 
      });
    }
    
    logger.warn(`API key revoked: ${req.params.keyId}`);
    res.status(200).json({
      success: true,
      data: {},
      message: 'API key revoked successfully'
    });
  } catch (error: any) {
    logger.error(`Revoke API key error: ${error.message}`);
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};
