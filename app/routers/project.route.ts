import express from "express";
import { 
  handleCreateProject,
  handleGetAllProjects,
  handleGetProjectById,
  handleUpdateProject,
  handleDeleteProject,
} from 
"../controllers/project.controller";

const router = express.Router();

router.route("/")
  .get(handleGetAllProjects)
  .post(handleCreateProject)

router.route("/:id")
  .get(handleGetProjectById)
  .delete(handleDeleteProject)
  .put(handleUpdateProject)


export default router;
