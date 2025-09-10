// @desc Get projects 
// @route GET /api/v2
// @access private
export const getProject = (req, res) => {
  res.status(200).json({ message: "Get project."}) 
};

// @desc Post project
// @route POST /api/v2
// @access private
export const postProject = (req, res) => {
  res.status(201).json({ message: "Set projects."})
};

// @desc Get projects
// @route GET /api/v2/:id
// @access private
export const getProjects = (req, res) => {
  res.status(200).json({ message: "Get projects."})
};

// @desc Update project
// @route PUT /api/v2/:id
// @access private
export const updateProject = (req, res) => {
  res.status(200).json({ message: "Update projects."})
};

// @desc Delete project
// @route DELETE /api/v2/:id
// @access private
export const deleteProject = (req, res) => {
  res.status(200).json({ message: "Delete projects."})
};

