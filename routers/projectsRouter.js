const express = require("express");
const projectsDb = require("../data/helpers/projectModel");
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

router.post("/", async (req, res) => {
  try {
    if (!req.body.name && req.body.description) {
      res.status(401).json({
        message:
          "Name and Description should be filled in order to create a project"
      });
    } else {
      const newProject = await projectsDb.insert(req.body);
      res.status(201).json(newProject);
    }
  } catch (err) {
    console.log("this is from the post", err);
    res.status(500).json({
      message: "Server issues"
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    if (req.params.id) {
      const updateProject = await projectsDb.update(req.params.id, req.body);
      res.status(201).json(updateProject);
    }
  } catch (err) {
    console.log("PUT", err);
    res.status(500).json({
      message: "Server issues"
    });
  }
});

module.exports = router;
