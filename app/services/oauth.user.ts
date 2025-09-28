// ./app/services/oauth.user.ts
/*
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { logger } from "../utils/logger";

export const generateJWT = (userId: string) =>{
  const token = jwt.sign(
    {id: userId},
    process.env.JWT_SECRET || "fallback-screte",
    {expiresIn: "7d"}
  );
  return token;
};

export const findOrCreateUserFromGoogle = async(profile:any) =>{
 // Check if Goggle ID exist
 let user = await User.findOne({ "socialAuth.goggle.id": profile.id });

 if(!user){
   // Check if email exits
   user = await User.findOne({ email: profile.emails[0].value });

   if(!user){
     // Create new dev
     user = new User({
       email: profile.emails[0].value,
       socialAuth: {
         goggle:{
           id: profile.id,
           username: profile.username,
           email: profile.emails[0].value
         }
       },
       emailVerified: true
     });
     await user.save();
     logger.success(`New user created via Goggle: ${user.email}`);
   } else {
     // link goggle to existing account
     user.socialAuth.google = {
       id: profile.id,
       username: profile.username,
       email: profile.emails[0].value
     };
     user.emailVerified = true;
     await user.save();
     logger.info(`Goggle account linked to: ${user.email}`);
   }
 }
 return user;
};

export const findOrCreateUserFromGitHub = async(profile:any)=>{
 const email = profile.emails?[0]?.value || `${profile.username}@github.com`;
 let user = await User.findOne({ "socialAuth.github.id": profile.id });
 if(!user){
   user = await User.findOne({ email });

   if(!user){
     user = new User({
       email: email,
       socialAuth:{
         github:{
           id: profile.id,
           username: profile.username,
           email: email,
         }
       },
       emailVerified: !!profile.emails?[0]?.value;
     });
     await user.save();
     logger.success(`New user created via GitHub: ${user.email}`);
   } else {
     user.socialAuth.github = {
       id: profile.id,
       username: profile.username,
       email: profile.email
     };
     if(profile.emails?[0]?.value)
       user.emailVerified = true,
       await user.save();
     logger.info(`GitHub account linked to: ${user.email}`);
   }
 }

 return user;
};
*/
