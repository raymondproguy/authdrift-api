import express from "express";
import { getProject, createProject, getProjects, updateProject, deleteProject } from 
"../controllers/project.controller.ts";

const router = express.Router();

router.route("/").get(getProject).post(createProject);
router.route("/:id").delete(deleteProject).get(getProjects).put(updateProject);

//router.get("/", getProject);

//router.post("/", cretetProject);

//router.get("/", getProjects);

//router.put("/:id", updateProject);

//router.delete("/:id", deleteProject);

export default router;
