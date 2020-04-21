const projects = require("../data/helpers/projectModel");

function validateProject() {
  return (req, res, next) => {
    const { name, description } = req.body;
    if (!name || !description) {
      res
        .status(400)
        .json({
          errorMessage: "Please provide name and description for the project."
        });
    }
    next();
  };
}

module.exports = {
  validateProject,
};
