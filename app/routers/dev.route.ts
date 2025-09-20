import express from "express";
import {
  handleCreateDev,
  handleGetDevByName,
  handleUpdateDev,
  handleDeleteDev,
} from "../controllers/dev.controller";
//import { validateDev } from "../middleware/validation";

const router = express.Router();

router.route("/")
 // .get(handleGetAllDevs)
  .post(handleCreateDev); // will add validation later

router.route("/:id")
  .get(handleGetDevByName)
  .put(handleUpdateDev)
  .delete(handleDeleteDev);

export default router;
