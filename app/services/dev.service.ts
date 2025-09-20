import Dev from "../models/dev.model";
import { logger } from "../utils/logger";

export const createDev = async (data: any) => {
  const dev = new Dev(data);
  const savedDev = await dev.save();
  logger.debug(`Dev created in DB: ${savedDev.email}`);
  return savedDev;
};

/*
export const getAllDevs = async () => {
  const devs = await Dev.find().select('-password');
  logger.debug(`Found ${devs.length} devs in DB`);
  return devs;
};
*/

export const getDevByName = async (devname: string) => {
  const dev = await Dev.findOne({ devname }).select('-password');
  logger.debug(`Dev lookup by Dev Name: ${devname}`);
  return dev;
};

export const getDevByEmail = async (email: string) => {
  const dev = await Dev.findOne({ email }).select('+password');
  logger.debug(`Dev lookup by Email: ${email}`);
  return dev;
};

export const updateDev = async (id: string, data: any) => {
  const dev = await Dev.findByIdAndUpdate(id, data, { 
    new: true, 
    runValidators: true 
  }).select('-password');
  logger.debug(`Dev updated in DB: ${id}`);
  return dev;
};

export const deleteDev = async (id: string) => {
  const dev = await Dev.findByIdAndDelete(id);
  logger.debug(`Dev deleted from DB: ${id}`);
  return dev;
};
