const express = require("express");
const projectRoutes = require("./project.route");

const router = express.Router();

/**
 * routes
 */
router.use("/project", projectRoutes);

module.exports = router;
