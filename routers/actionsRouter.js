const express = require("express");
const actions = require("../data/helpers/actionModel");
const {
  validateProjectId,
  validateActionBody
} = require("../middlewars/validate");
const router = express.Router({ mergeParams: true });

router.get("/", validateProjectId(), async (req, res, next) => {
  try {
    const projectActions = await actions.get(req.params.project_id);
    res.status(200).json({ message: projectActions });
  } catch (err) {
    next(err);
  }
});

router.post("/", validateProjectId(), async (req, res, next) => {
  try {
    let newAction = {
      project_id: req.params.id,
      description: req.body.description,
      notes: req.body.notes
    };
    const newProject = await actions.insert(newAction);
    res.json(newProject);
  } catch (err) {
    next(err);
  }
});

router.put("/:action_id", validateProjectId(), async (req, res, next) => {
  try {
    let deleteAction = await actions.update(req.params.action_id, req.body);
    res.json(deleteAction);
  } catch (err) {
    next(err);
  }
});

router.delete(
  "/:action_id",
  validateActionBody(),
  validateProjectId(),
  async (req, res, next) => {
    try {
      let deleteAction = await actions.remove(req.params.action_id);
      res.json(deleteAction);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
