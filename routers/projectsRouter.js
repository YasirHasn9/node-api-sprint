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

module.exports = router;
