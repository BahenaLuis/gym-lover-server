const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(50);
const price = Joi.number().integer().min(1);
const image = Joi.string().uri();
const description = Joi.string().min(10);
const categoryId = Joi.number().integer();

const limit = Joi.number().integer();
const offset = Joi.number().integer();
const minPrice = Joi.number().integer();
const maxPrice = Joi.number().integer();

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
  description: description.required(),
  categoryId: categoryId.required()
});

const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image,
  description: description,
  categoryId: categoryId
});

const getProductSchema = Joi.object({
  id: id.required()
});

const getProductPageSchema = Joi.object({
  limit: limit,
  offset: offset,
  price: price,
  min_price: minPrice,
  max_price: maxPrice.when('min_price', {
    is:  Joi.exist(),
    then: maxPrice.required()
  })
});

module.exports = {
  createProductSchema, updateProductSchema, getProductSchema, getProductPageSchema
}

