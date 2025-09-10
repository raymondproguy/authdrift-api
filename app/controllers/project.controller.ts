export const getProject = (req, res) => {
  res.status(200).json({ message: "Get project."}) 
};

export const postProject = (req, res) => {
  res.status(201).json({ message: "Set projects."})
};

export const getProjects = (req, res) => {
  res.status(200).json({ message: "Get projects."})
};

export const updateProject = (req, res) => {
  res.status(200).json({ message: "Update projects."})
};

export const deleteProject = (req, res) => {
  res.status(200).json({ message: "Delete projects."})
};

