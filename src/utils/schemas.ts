import Joi from 'joi';

export const productSchema = Joi.object({
  sku: Joi.string()
    .pattern(/^FAL-([0-9]{7,8})$/)
    .required(),
  name: Joi.string().min(3).max(50).required(),
  brand: Joi.string().min(3).max(50).required(),
  size: Joi.string().min(1).max(20).allow(''),
  price: Joi.number().min(1).max(99999999).required(),
  image: Joi.string().uri(),
});
