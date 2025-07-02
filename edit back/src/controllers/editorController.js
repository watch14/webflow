const fs = require("fs-extra");
const path = require("path");

// Ensure data directory exists
const dataDir = path.join(__dirname, "../../data");
fs.ensureDirSync(dataDir);

const configurationsFile = path.join(dataDir, "configurations.json");

// Initialize configurations file if it doesn't exist
const initializeConfigurationsFile = async () => {
  if (!(await fs.pathExists(configurationsFile))) {
    await fs.writeJson(configurationsFile, {
      current: null,
      saved: {},
    });
  }
};

// Get current or specific configuration
const getConfiguration = async (req, res) => {
  try {
    await initializeConfigurationsFile();
    const data = await fs.readJson(configurationsFile);
    const configId = req.params.id;

    if (configId) {
      // Get specific saved configuration
      if (data.saved[configId]) {
        res.json({
          success: true,
          configuration: data.saved[configId],
        });
      } else {
        res.status(404).json({ error: "Configuration not found" });
      }
    } else {
      // Get current configuration
      res.json({
        success: true,
        configuration: data.current,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Failed to get configuration",
      details: error.message,
    });
  }
};

// Save configuration (current or with specific ID)
const saveConfiguration = async (req, res) => {
  try {
    await initializeConfigurationsFile();
    const data = await fs.readJson(configurationsFile);
    const configId = req.params.id;
    const configuration = req.body;

    // Add timestamp
    configuration.lastModified = new Date().toISOString();

    if (configId) {
      // Save as named configuration
      if (!configuration.name) {
        configuration.name = `Configuration ${configId}`;
      }
      configuration.id = configId;
      data.saved[configId] = configuration;
    } else {
      // Save as current configuration
      data.current = configuration;
    }

    await fs.writeJson(configurationsFile, data, { spaces: 2 });

    res.json({
      success: true,
      message: configId
        ? "Configuration saved successfully"
        : "Current configuration updated",
      configuration: configuration,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to save configuration",
      details: error.message,
    });
  }
};

// Get all saved configurations
const getConfigurations = async (req, res) => {
  try {
    await initializeConfigurationsFile();
    const data = await fs.readJson(configurationsFile);

    // Convert saved configurations object to array
    const configurations = Object.values(data.saved).map((config) => ({
      id: config.id,
      name: config.name,
      lastModified: config.lastModified,
      hero: {
        title: config.hero?.title || "",
        subtitle: config.hero?.subtitle || "",
      },
      navbar: {
        logo: config.navbar?.logo || "",
      },
    }));

    res.json({
      success: true,
      configurations: configurations,
      current: data.current,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to get configurations",
      details: error.message,
    });
  }
};

// Delete specific configuration
const deleteConfiguration = async (req, res) => {
  try {
    await initializeConfigurationsFile();
    const data = await fs.readJson(configurationsFile);
    const configId = req.params.id;

    if (data.saved[configId]) {
      delete data.saved[configId];
      await fs.writeJson(configurationsFile, data, { spaces: 2 });

      res.json({
        success: true,
        message: "Configuration deleted successfully",
      });
    } else {
      res.status(404).json({ error: "Configuration not found" });
    }
  } catch (error) {
    res.status(500).json({
      error: "Failed to delete configuration",
      details: error.message,
    });
  }
};

module.exports = {
  getConfiguration,
  saveConfiguration,
  getConfigurations,
  deleteConfiguration,
};
