const express = require("express");
const router = express.Router();
const { validateEditorData } = require("../middleware/validation");
const {
  getConfiguration,
  saveConfiguration,
  getConfigurations,
  deleteConfiguration,
} = require("../controllers/editorController");

// Get all saved configurations
router.get("/configurations", getConfigurations);

// Get specific configuration
router.get("/configuration/:id?", getConfiguration);

// Save configuration
router.post("/configuration", validateEditorData, saveConfiguration);

// Update configuration
router.put("/configuration/:id", validateEditorData, saveConfiguration);

// Delete configuration
router.delete("/configuration/:id", deleteConfiguration);

module.exports = router;
