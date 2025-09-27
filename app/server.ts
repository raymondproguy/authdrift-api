/**
 * AuthDrift API - Auth-as-a-Service
 * I'm building from scracth
 * Raymond Nicholas ProGuy
 * Free, Open Source, Secure Authentication API
 * Just plug and use no need for extra setup
 */
import express from "express";
import { Request, Response } from "express";
import connectDB from './config/database';
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import passport from "passport";
import session  from "express-session";
import { logger } from "./utils/logger";
import projectRoutes from "./routers/project.route";
import devRoutes from "./routers/dev.route";
import userRoutes from "../app/routers/user.route";
import devOathRoute from "./routers/oauth.route";
import { requestLogger } from './middleware/request.logger';
//import dashboardRoute from "./routes/dashboard.route.ts";
//import { setupSwaggerDocs } from "./config/swagger.ts";

dotenv.config();

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100
}));

// Add session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback-secret',
  resave: false,
  saveUninitialized: false
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());


app.use(requestLogger);

app.use("/api/v2/project", projectRoutes);
app.use("/api/v2/dev", devRoutes);
app.use("/api/v2/user", userRoutes);

//dev oauth endpoint
app.use("/api/v2/dev-auth", devOathRoute);

//setupSwaggerDocs(app);

app.get('/', (req:Request, res:Response) => {
  logger.info("Root endpoint accessed")
  res.json({ message: 'Welcome to AuthDrift API V2, Secure your fueture with AuthDrift. Simple, modern, secure Authentication system for your app/startup '});
});

app.get('/health', (req:Request, res:Response) => {
  logger.info("Health endpoint accessed");
  res.status(200).json({ status: 'OK' });
});

connectDB().then(() =>{
 const PORT = process.env.PORT || 5000;
 const host = "0.0.0.0";
 app.listen(Number(PORT), host, () => {
   logger.success(`Server running on http://${host}:${PORT}`);
 });
});
