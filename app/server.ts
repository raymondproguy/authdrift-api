/**
 * Authify API - Auth-as-a-Service
 * I'm building from scracth
 * Raymond Nicholas ProGuy
 * Free, Open Source, Secure Authentication API
 * Just plug and use no need for extra setup
 */
import express from 'express';
//import connectDB from './config/database.ts';
import dotenv from 'dotenv';
//import path from 'path';
import helmet from "helmet";
//import authRoutes from "./routes/auth.route.ts";
//import dashboardRoute from "./routes/dashboard.route.ts";
//import { setupSwaggerDocs } from "./config/swagger.ts";

dotenv.config();

const app = express();
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app.use(express.static(path.join(process.cwd(), 'public')));

//app.use("/api/v2/auth", authRoutes);
//app.use("/api", dashboardRoute);

//setupSwaggerDocs(app);

app.get('/', (_req, res) => {
  res.json({ message: 'Welcome to AuthifyNG API Version two way more bigger and better.' });
});

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'OK' });
});

//connectDB().then(() =>{
const PORT = process.env.PORT || 5000;
const host = "0.0.0.0";
 app.listen(Number(PORT), host, () => {
 console.log(`Server runnig on http://${host}:${PORT}`)
 });
//});
