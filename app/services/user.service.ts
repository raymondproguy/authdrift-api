// ./app/services/user.service.ts

import User from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt  from "jsonwebtoken";
import { logger } from "../utils/logger";

export const createUser = async (data: any) => {
  const user = new User(data);
  const savedUser = await user.save();
  logger.debug(`User created in DB: ${savedUser.email}`);
  return savedUser;
};


export const getAllUsers = async () => {
  const user = await User.find().select('-password');
  logger.debug(`Found ${user.length} users in DB`);
  return user;
};


export const getUserByName = async (username: string) => {
  const user = await User.findOne({ username }).select('-password');
  logger.debug(`User lookup by User Name: ${user}`);
  return user;
};

export const getUserByEmail = async (email: string) => {
  const user = await User.findOne({ email }).select('+password');
  logger.debug(`User lookup by Email: ${email}`);
  return user;
};

export const updateUser = async (id: string, data: any) => {
  const user = await User.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true
  }).select('-password');
  logger.debug(`User updated in DB: ${id}`);
  return user;
};

export const deleteUser = async (id: string) => {
  const user = await User.findByIdAndDelete(id);
  logger.debug(`User deleted from DB: ${id}`);
  return user;
};

export const registerUser = async (data:any) =>{
  const existingUser = await User.findOne({
    $or: [{email: data.email}, {username: data.username}]
  });
  if(existingUser) {
    throw new Error ("User already exits with this email or username ");
  }
  const user = new User(data);
  const savedUser = await user.save();
  logger.debug(`User registerd ${savedUser.email}`)

  //Generate JWT token
  const token = generateJWT(savedUser.email);

  return {user: savedUser, token}
};

export const loginUser = async (email:string, password:string) =>{
  const user = await User.findOne({email}).select("+password")
  if (!user){
    throw new Error ("Invalid credentials");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error ("Invalid credentials");
  }
  logger.debug(`Logged in user ${user.email}`);

  const token = generateJWT(user.email);

  return {user, token};
};

export const generateJWT = (userId:string) =>{
  return jwt.sign(
    {id: userId},
    process.env.JWT_SECRET || "fallback-secret",
    {expiresIn: "1d"}
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
