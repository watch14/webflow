const Joi = require("joi");

// Validation schema for editor data
const editorSchema = Joi.object({
  name: Joi.string().optional(),
  hero: Joi.object({
    title: Joi.string().required(),
    subtitle: Joi.string().required(),
    titleColor: Joi.string()
      .pattern(/^#[0-9A-Fa-f]{6}$/)
      .required(),
    subtitleColor: Joi.string()
      .pattern(/^#[0-9A-Fa-f]{6}$/)
      .required(),
    button: Joi.object({
      text: Joi.string().required(),
      href: Joi.string().required(),
      textColor: Joi.string()
        .pattern(/^#[0-9A-Fa-f]{6}$/)
        .required(),
      bgColor: Joi.string()
        .pattern(/^#[0-9A-Fa-f]{6}$/)
        .required(),
    }).required(),
    bgType: Joi.string().valid("color", "image").required(),
    bgColor: Joi.string()
      .pattern(/^#[0-9A-Fa-f]{6}$/)
      .required(),
    bgImage: Joi.string().allow("").optional(),
  }).required(),
  navbar: Joi.object({
    logo: Joi.string().required(),
    logoColor: Joi.string()
      .pattern(/^#[0-9A-Fa-f]{6}$/)
      .required(),
    links: Joi.array()
      .items(
        Joi.object({
          label: Joi.string().required(),
          href: Joi.string().required(),
        })
      )
      .required(),
    linkColor: Joi.string()
      .pattern(/^#[0-9A-Fa-f]{6}$/)
      .required(),
    cta: Joi.object({
      label: Joi.string().required(),
      href: Joi.string().required(),
      textColor: Joi.string()
        .pattern(/^#[0-9A-Fa-f]{6}$/)
        .required(),
      bgColor: Joi.string()
        .pattern(/^#[0-9A-Fa-f]{6}$/)
        .required(),
    }).required(),
  }).required(),
  lastModified: Joi.string().optional(),
  id: Joi.string().optional(),
});

const validateEditorData = (req, res, next) => {
  const { error } = editorSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      error: "Validation failed",
      details: error.details.map((detail) => ({
        field: detail.path.join("."),
        message: detail.message,
      })),
    });
  }

  next();
};

module.exports = {
  validateEditorData,
};
