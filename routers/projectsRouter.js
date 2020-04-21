const express = require("express");
const projectsDb = require("../data/helpers/projectModel");
const {
  validateProject,
  validateProjectId
} = require("../middlewars/validate");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let project = await projectsDb.get();
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({
        message: "Project not found"
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Issues with the server"
    });
  }
});

router.post("/", validateProject(), async (req, res, next) => {
  try {
    const newProject = await projectsDb.insert(req.body);
    res.status(201).json(newProject);
  } catch (err) {
    next();
  }
});

router.put(
  "/:id",
  validateProject(),
  validateProjectId(),
  async (req, res, next) => {
    try {
      const updateProject = await projectsDb.update(req.params.id, req.body);
      res.status(201).json(updateProject);
    } catch (err) {
      next(err);
    }
  }
);

router.delete("/:id", validateProjectId(), async (req, res, next) => {
  try {
    const deletedProject = await projectsDb.remove(req.params.id);
    res.status(200).json( deletedProject);
  } catch (err) {
    next(err);
  }
});
module.exports = router;
