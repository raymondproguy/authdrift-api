// ./app/services/project.service.ts

import Project from "../models/project.model";

export const createProject = async (data) => {
  const project = new Project(data);
  return await project.save();
};

 export const getAllProjects = async () =>{
  return await Project.find();
};

export const getAllProjectById = async (id) =>{
  return await Project.findById(id);
};

export const updateProject = async (id, data) =>{
  return await Project.findByIdAndUpdate(id, data, { new: true });
};

export const deleteProject = async (id) =>{
  return await Project.findByIdAndDelete(id);
};
