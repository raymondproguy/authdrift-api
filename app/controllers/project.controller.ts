// ./app/controllers/project.controller.ts

import { 
  createProject,
  getAllProjects,
  getAllProjectById, 
  updateProject,
  deleteProject
} from "../services/project.service";

// @desc Get projects 
// @route GET /api/v2/project
// @access private
export const handleCreateProjectProject = async (_req, res) => {
   try {
    const project = await createProject({_req.body, createdBy: req.user.id});
    res.status(201).json(project);
   } catch (error) {
    res.status(500);
    res.json({ message: error.message });
   }
};

// @desc Post project
// @route POST /api/v2/project
// @access private
export const handleGetAllProjects = async (_req, res) => {
  try {
     const projects = await getAllProjects();
     res.status(200).json(projects)
   } catch (error) {
    res.status(500);
    res.json({ message: error.message });
   }
};

// @desc Get projects
// @route GET /api/v2/project/:id
// @access private
export const handleGetProjectById = async (_req, res) => {
  try {
    const project = await getAllProjectById(req.params.id);
    if (!project)
      return res.status(404).json({ message: "Oops Project not found." });
    res.json(project);
   } catch (error) {
    res.status(500);
    res.json({ message: error.message });
   }
};

// @desc Update project
// @route PUT /api/v2/project/:id
// @access private
export const handleUpdateProject = async (_req, res) => {
  try {
    const project await updateProject(req.params.id, req.body);
    if(!project)
      return res.status(404).json({ message: "Opps Project not found."})
    res.json(project);
   } catch (error) {
    res.status(500);
    res.json({ message: error.message });
   }
};

// @desc Delete project
// @route DELETE /api/v2/project/:id
// @access private
export const handleDeleteProject = (_req, res) => {
  try {
    const project = await deleteProject(req.params.id, req.body);
    if (!project)
      return res.status(404).json({ message: "Opps not found."});
    res.json({ message: "Project deleted. "});
   } catch (error) {
    res.status(500);
    res.json({ message: error.message });
   }
};

