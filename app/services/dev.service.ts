// ./app/services/dev.service.ts

import Dev from "../models/dev.model";
import bcrypt from "bcryptjs";
import jwt  from "jsonwebtoken";
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

export const registerDev = async (data:any) =>{
  const existingDev = await Dev.findOne({
    $or: [{email: data.email}, {devname: data.devname}]
  });
  if(existingDev) {
    throw new Error ("Dev already exits with this email or username ");
  }
  const dev = new Dev(data);
  const savedDev = await dev.save();
  logger.debug(`Dev registerd ${savedDev.email}`)

  //Generate JWT token 
  const token = generateJWT(savedDev._id);

  return {dev: savedDev, token}
};

export const loginDev = async (email:string, password:string) =>{
  const dev = await Dev.findOne({email}).select("+password")
  if (!dev){
    throw new Error ("Invalid credentials");
  }

  const isPasswordValid = await bcrypt.compare(password, dev.password);
  if (!isPasswordValid) {
    throw new Error ("Invalid credentials");
  }
  logger.debug(`Logged in dev ${dev.email}`);

  const token = generateJWT(dev._id);

  return {dev, token};
};

export const generateJWT = (devId:string) =>{
  return jwt.sign(
    {id: devId},
    process.env.JWT_SECRET || "fallback-secret",
    {expiresin: "7d"}
  );
};

export const verifyToken = (token:string) =>{
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret");
    return decoded;
  } catch (error) {
    throw new Error("Invalid token");
  };
};
