import Joi from "joi";

export const addAddressSchema = Joi.object({
  fullName: Joi.string().trim().min(2).max(100).required(),
  phone: Joi.string().trim().min(7).max(20).required(),
  addressLine1: Joi.string().trim().min(2).max(200).required(),
  addressLine2: Joi.string().trim().max(200).optional().allow(""),
  city: Joi.string().trim().min(2).max(100).required(),
  state: Joi.string().trim().min(2).max(100).required(),
  postalCode: Joi.string().trim().min(3).max(20).required(),
  country: Joi.string().trim().min(2).max(100).required(),
  landmark: Joi.string().trim().max(200).optional().allow(""),
  type: Joi.string().valid("home", "work", "other").optional(),
  isDefault: Joi.boolean().optional(),
});
