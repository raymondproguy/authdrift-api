// ./app/services/oauth.dev.ts

import jwt from "jsonwebtoken";
import Dev from "../models/dev.model";
import { logger } from "../utils/logger";

export const generateJWT = (devId: string) =>{
  const token = jwt.sign(
    {id: devId},
    process.env.JWT_SECRET || "fallback-screte",
    {expiresIn: "7d"}
  );
  return token;
};

export const findOrCreateDevFromGoogle = async(profile:any) =>{
 // Check if Goggle ID exist
 let dev = await Dev.findOne({ "socialAuth.goggle.id": profile.id });

 if(!dev){
   // Check if email exits
   dev = await Dev.findOne({ email: profile.emails[0].value });
 
   if(!dev){
     // Create new dev
     dev = new Dev({
       email: profile.emails[0].value,
       socialAuth: {
         goggle:{
           id: profile.id,
           devname: profile.devname,
           email: profile.emails[0].value
         }
       },
       emailVerified: true
     });
     await dev.save();
     logger.success(`New dev created vai Goggle: ${dev.email}`);
   } else {
     // link goggle to existing account 
     dev.socialAuth.google = {
       id: profile.id,
       devname: profile.devname,
       email: profile.emails[0].value
     };
     dev.emailVerified = true;
     await dev.save();
     logger.info(`Goggle account linked to: ${dev.email}`);
   }
 }
 return dev;
};

export const findOrCreateDevFromGitHub = async(profile:any)=>{
 const email = profile.emails?[0]?.value || `${profile.devname}@github.com`;
 let dev = await Dev.findOne({ "socialAuth.github.id": profile.id });
 if(!dev){
   dev = await Dev.findOne({ email });

   if(!dev){
     dev = new Dev({
       email: email,
       socialAuth:{
         github:{
           id: profile.id,
           devname: profile.devname,
           email: email,
         }
       },
       emailVerified: !!profile.emails?[0]?.value
     });
     await dev.save();
     logger.success(`New dev created via GitHub: ${dev.email}`);
   } else {
     dev.socialAuth.github = {
       id: profile.id,
       devname: profile.devname,
       email: profile.email
     };
     if(profile.emails?[0]?.value) 
       dev.emailVerified = true,
       await dev.save();
     logger.info(`GitHub account linked to: ${dev.email}`);
   }
 }

 return dev;
};
