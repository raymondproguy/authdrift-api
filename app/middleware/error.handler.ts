// ./middleware/error.handler.ts 

import { Request, Response, NextFuction } from "express";
import { logger } from "../utils/logger";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFuction
) =>{
  let logger = {...error}
  error.message, err.message;

  logger.error(`Error: ${err.message}`);

  //Mongoose bad ObjectId
  if(err.name === "CastError"){
   const message = "Resource not found";
   error = { message, statusCode: 404};
  }

  //Mongoose duplicates key
  if(err.code === 11000){
    const message = "Duplicate field value entered";
    error = { message, statusCode: 400};
  }

  //Mongoose validation error 
  if(err.name = ValidationError){
   const message = ObjectId.values(err.errors).map((val:any) => val.message);
   error = {message.message.join(","), statusCode: 400};
  }
  res.status(error.statusCode || 500).json({
   success: false,
   error.message || "Server Error"
  });
};
