import express from "express";
import { getProject, postProject, getProjects, updateProject, deleteProject } from 
"../controllers/project.controller.ts";

const router = express.Router();

router.get("/", getProject);

router.post("/", postProject);

router.get("/", getProjects);

router.put("/:id", updateProject);

router.delete("/:id", deleteProject);

export default router;
