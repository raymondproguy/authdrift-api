import { express, Request, Response } from "express";
const router = express.Router();

router.get("/projects");
router.post("/project");
router.put("/project/:id");
router.delete("/project/:id");

export default router;
