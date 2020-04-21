const express = require("express");
const projectsDb = require("../data/helpers/projectModel");
const { validateProject } = require("../middlewars/validate");
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

router.post("/", validateProject() , async (req, res , next) => {
  try {
      const newProject = await projectsDb.insert(req.body);
      res.status(201).json(newProject);
  } catch (err) {
    next()
  }
});

router.put("/:id", validateProject(), async (req, res, next) => {
  try {
    const updateProject = await projectsDb.update(req.params.id, req.body);
    res.status(201).json(updateProject);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    if (req.params.id) {
      const deletedProject = await projectsDb.remove(req.params.id);
      res.status(200).json(deletedProject);
    }
  } catch (err) {
    console.log("Delete", err);
    res.status(500).json({
      message: "Server issues"
    });
  }
});

// router.get("/:id/actions", async (req, res) => {
//   try {
//     if (req.project.id) {
//       const getActions = await projectsDb.getProjectActions(
//         req.project.id
//       );
//       res.status(201).json(getActions);
//     } else {
//       res.status(500).json({ message: "wrong id" });
//     }
//   } catch (err) {
//     console.log("PUT", err);
//     res.status(500).json({
//       message: "Server issues"
//     });
//   }
// });
module.exports = router;
