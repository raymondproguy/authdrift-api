// ./app/services/project.service.ts

import Project from "../models/project.model";
import { logger } from "../utils/logger";

export const createProject = async (data:any) => {
  const project = new Project(data);
  const savedProject = await project.save()
  logger.debug(`Project created in DB: ${savedProject.name}`)
  return savedProject;
};

 export const getAllProjects = async (id: any) =>{
  const projects = await Project.find();
  logger.debug(`Found ${projects} in DB`)
  return projects;
};

export const getProjectById = async (id: string) =>{
  const project = await Project.findById(id);
  logger.debug(`Found lookup ${id}`)
  return project;
};

export const updateProject = async (id:any, data:any) =>{
  const project = await Project.findByIdAndUpdate(id, data,
  { new: true, runValidators: true });
  logger.debug(`Project Updated in DB ${id}`)
  return project;
};

export const deleteProject = async (id: any) =>{
  const project = await Project.findByIdAndDelete(id);
  logger.debug("Project deleted from DB:")
  return project;
};
