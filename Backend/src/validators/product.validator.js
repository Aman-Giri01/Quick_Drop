import Joi from "joi";

const imageSchema = Joi.object({
  url: Joi.string().uri().required(),
  asset_id: Joi.string().required(),
  public_id: Joi.string().required(),
});

export const addProductValidator = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),
  description: Joi.string().trim().min(5).required(),
  price: Joi.number().positive().required(),
  images: Joi.array().items(imageSchema).min(1).required(),
  category: Joi.string().trim().required(),
  brand: Joi.string().trim().required(),
  stocks: Joi.number().integer().min(0).required(),
});

export const updateProductValidator = Joi.object({
  name: Joi.string().trim().min(2).max(100).optional(),
  description: Joi.string().trim().min(5).optional(),
  price: Joi.number().positive().optional(),
  images: Joi.array().items(imageSchema).min(1).optional(),
  category: Joi.string().trim().optional(),
  brand: Joi.string().trim().optional(),
  stocks: Joi.number().integer().min(0).optional(),
})
