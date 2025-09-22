// ./app/routers/dev.route.ts

import express from "express";
import {
  handleCreateDev,
  handleGetDevByName,
  handleUpdateDev,
  handleDeleteDev,
  handleRegister,
  handleLogin,
  handleGetProfile
} from "../controllers/dev.controller";
import ApiKeyRoutes from "../routers/apiKey.route";
import { authenticateToken } from "../middleware/auth.dev";
//import { validateDev } from "../middleware/validation";

const router = express.Router();

router.post("/signup", handleRegister)
router.post("/signin", handleLogin)

router.route("/")
  .post(authenticateToken, handleCreateDev); // will add validation later

router.route("/:id")
  .get(authenticateToken, handleGetProfile)
  .get(authenticateToken, handleGetDevByName)
  .put(authenticateToken, handleUpdateDev)
  .delete(authenticateToken, handleDeleteDev);

router.use("/:devID/api-keys", ApiKeyRoutes)
export default router;
