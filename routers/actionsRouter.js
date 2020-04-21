const express = require("express");
const actions = require("../data/helpers/actionModel");
const { validateProjectId } = require("../middlewars/validate");
const router = express.Router({ mergeParams: true });

router.get("/", validateProjectId(), async (req, res) => {
  try {
    const projectActions = await actions.get(req.params.project_id);
    res.status(200).json({ message: projectActions });
  } catch (err) {}
});

module.exports = router;
