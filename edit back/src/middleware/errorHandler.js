const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  // Multer errors
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({
      error: "File too large",
      details: "File size must be less than 5MB",
    });
  }

  if (err.code === "LIMIT_FILE_COUNT") {
    return res.status(400).json({
      error: "Too many files",
      details: "Only one file can be uploaded at a time",
    });
  }

  if (err.code === "LIMIT_UNEXPECTED_FILE") {
    return res.status(400).json({
      error: "Unexpected file field",
      details: 'File field name must be "image"',
    });
  }

  // Custom validation errors
  if (err.message === "Only image files are allowed!") {
    return res.status(400).json({
      error: "Invalid file type",
      details: "Only image files (JPG, PNG, GIF, WebP) are allowed",
    });
  }

  // JSON parsing errors
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      error: "Invalid JSON",
      details: "Request body contains invalid JSON",
    });
  }

  // Default error
  res.status(500).json({
    error: "Internal server error",
    details:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Something went wrong",
  });
};

module.exports = {
  errorHandler,
};
