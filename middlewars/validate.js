const projects = require("../data/helpers/projectModel");

function validateProject() {
  return (req, res, next) => {
    const { name, description } = req.body;
    if (!name || !description) {
      res.status(400).json({
        errorMessage: "Please provide name and description for the project."
      });
    }
    next();
  };
}

function validateProjectId() {
  return async (req, res, next) => {
    try {
      const project = await projects.get(req.params.id);
      if (project) {
        req.project = project;
        next();
      } else {
        res.status(404).json({
          message: "Project not found"
        });
      }
    } catch (err) {
      next(error);
    }
  };
}

module.exports = {
  validateProject,
  validateProjectId
};
