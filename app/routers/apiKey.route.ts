// ./app/routers/apiKey.route.ts

import express from "express";
import {
  handleGenerateApiKey,
  handleGetApiKeys,
  handleRevokeApiKey
} from "../controllers/apiKey.controller";

const router = express.Router();

// All routes are under /api/v2/dev/:devId/api-keys
router.route("/")
  .get(handleGetApiKeys)          // GET /api/v2/dev/:devId/api-keys
  .post(handleGenerateApiKey);    // POST /api/v2/dev/:devId/api-keys

router.route("/:keyId")
  .delete(handleRevokeApiKey);    // DELETE /api/v2/dev/:devId/api-keys/:keyId

export default router;
