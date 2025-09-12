// src/config/database.ts
import mongoose from "mongoose";
import { logger } from "../utils/logger";

const connectDB = async() => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI!);
    logger.success(`MongoDB Connected:
                ${conn.connection.host}` .green);
  } catch (error: any) {
    logger.error(`MongoDB connection failed:, ${error.message}` .red);
     process.exit(1);
  }
};

export default connectDB;

