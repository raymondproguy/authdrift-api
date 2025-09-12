// ./app/services/project.service.ts

import Project from "../models/project.model";

export const createProject = async (data:any) => {
  const project = new Project(data);
  return await project.save();
};

 export const getAllProjects = async () =>{
  return await Project.find();
};

export const getAllProjectById = async (id: any) =>{
  return await Project.findById(id);
};

export const updateProject = async (id:any, data:any) =>{
  return await Project.findByIdAndUpdate(id, data, { new: true });
};

export const deleteProject = async (id: any) =>{
  return await Project.findByIdAndDelete(id);
};
