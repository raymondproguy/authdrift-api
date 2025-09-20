// ./app/services/apikey.service.ts

import ApiKey from "../models/apiKey.model";
import { logger } from "../utils/logger";
import crypto from 'crypto';

export const generateApiKey = async (devId: string, name?: string) => {
  const key = crypto.randomBytes(32).toString('hex');
  const apiKey = new ApiKey({
    key,
    devId,
    name: name || 'Default Key',
    expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 1 year
  });
  
  const savedKey = await apiKey.save();
  logger.debug(`API key generated for dev: ${devId}`);
  return savedKey;
};

export const getApiKeysByDev = async (devId: string) => {
  const keys = await ApiKey.find({ devId }).sort({ createdAt: -1 });
  logger.debug(`Found ${keys.length} API keys for dev: ${devId}`);
  return keys;
};

export const validateApiKey = async (key: string) => {
  const apiKey = await ApiKey.findOne({ 
    key, 
    isActive: true,
    expiresAt: { $gt: new Date() }
  }).populate('devId', 'email company isActive');
  
  if (!apiKey) {
    logger.warn(`Invalid API key attempt: ${key.substring(0, 10)}...`);
    return null;
  }
  
  // Update last used
  await ApiKey.findByIdAndUpdate(apiKey._id, { lastUsed: new Date() });
  
  logger.debug(`API key validated for dev: ${apiKey.devId.devname}`);
  return apiKey;
};

export const revokeApiKey = async (keyId: string, devId: string) => {
  const apiKey = await ApiKey.findOneAndUpdate(
    { _id: keyId, devId },
    { isActive: false },
    { new: true }
  );
  
  if (!apiKey) {
    logger.warn(`API key not found or unauthorized: ${keyId}`);
    return null;
  }
  
  logger.debug(`API key revoked: ${keyId}`);
  return apiKey;
};

export const getApiKeyById = async (keyId: string, devId: string) => {
  const apiKey = await ApiKey.findOne({ _id: keyId, devId });
  return apiKey;
};
