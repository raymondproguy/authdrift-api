// ./app/routers/apiKey.route.ts

import express from "express";
import {
  handleCreateDev,
  handleGetDevByName,
  handleUpdateDev,
  handleDeleteDev,
} from "../controllers/dev.controller";
import ApiKeyRoutes from "../routers/apiKey.route";
//import { validateDev } from "../middleware/validation";

const router = express.Router();

router.route("/")
 // .get(handleGetAllDevs)
  .post(handleCreateDev); // will add validation later

router.route("/:id")
  .get(handleGetDevByName)
  .put(handleUpdateDev)
  .delete(handleDeleteDev);

router.use("/:devID/api-keys", ApiKeyRoutes)
export default router;
