// ./app/controllers/project.controller.ts

import { Request, Response } from "express";

import { 
  createProject,
  getAllProjects,
  getProjectById, 
  updateProject,
  deleteProject
} from "../services/project.service";
import { logger } from "../utils/logger";

// @desc Post projects 
// @route POST /api/v2/project
// @access private
export const handleCreateProject = async (req: Request, res:Response) => {
   try{
    const project = await createProject(req.body);
          //createdBy: req.user.id
   // });
    res.status(201).json(project);
    logger.success(`Project created ${project.name}`)
   } catch (error: any) {
    res.status(500);
    res.json({ message: error.message });
   }
};

// @desc Get project
// @route GET /api/v2/project
// @access private
export const handleGetAllProjects = async (req:Request, res: Response) => {
  try {
     const projects = await getAllProjects(req.body);
     logger.info(`Fetched ${projects} from DB`)
     res.status(200).json(projects)
   } catch (error: any) {
    res.status(500);
    res.json({ message: error.message });
   }
};

// @desc Get projects
// @route GET /api/v2/project/:id
// @access private
export const handleGetProjectById = async (req:Request, res:Response) => {
  try {
    const project = await getProjectById(req.params.id);
    if (!project)
      return res.status(404).json({ message: "Oops Project not found." });
    logger.info(`Fetched ${project.name} from DB`)
    res.json(project);
   } catch (error: any) {
    res.status(500);
    res.json({ message: error.message });
   }
};

// @desc Update project
// @route PUT /api/v2/project/:id
// @access private
export const handleUpdateProject = async (req:Request, res:Response) => {
  try {
    const project = await updateProject(req.params.id, req.body);
    if(!project)
      return res.status(404).json({ message: "Opps Project not found."})
    res.json(project);
    logger.info(`Project upadated: ${project.name}`)
   } catch (error: any) {
    res.status(500);
    res.json({ message: error.message });
   }
};

// @desc Delete project
// @route DELETE /api/v2/project/:id
// @access private
export const handleDeleteProject = async (req:Request, res:Response) => {
  try {
    const project = await deleteProject(req.params.id);
    if (!project)
      return res.status(404).json({ message: "Opps not found."});
    res.json({ message: "Project deleted. "});
    logger.info(`Project deleted from DB`)
   } catch (error: any) {
    res.status(500);
    res.json({ message: error.message });
   }
};

