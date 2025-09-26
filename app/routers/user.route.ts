// ./app/routers/dev.route.ts

import express from "express";
import {
  handleCreateUser,
  handleGetUserByName,
  handleUpdateUser,
  handleDeleteUser,
  handleRegisterUser,
  handleLoginUser,
  handleGetUserProfile
} from "../controllers/user.controller";
import { authenticateToken } from "../middleware/auth.dev";
//import { validate } from "../middleware/validation";

const router = express.Router();

router.post("/signup", handleRegisterUser)
router.post("/signin", handleLoginUser)

router.route("/")
  .post(authenticateToken, handleCreateUser); // will add validation later

router.route("/:id")
  .get(authenticateToken, handleGetUserProfile)
  .get(authenticateToken, handleGetUserByName)
  .put(authenticateToken, handleUpdateUser)
  .delete(authenticateToken, handleDeleteUser);

export default router;
