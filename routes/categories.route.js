const express = require('express');

const router = express.Router();
const CategoriesService = require('./../services/categories.service');
const categoriesService = new CategoriesService();

const { validatorHandler } = require('./../middlewares/validator.handler');
const { createCategorySchema, updateCategorySchema, getCategorySchema } = require('./../schemas/category.schema');

router.get('/:id',
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
  try {
    const id = req.params.id;
    category = await categoriesService.getById(id);
    res.json(category);
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res) => {
  const categories = await categoriesService.getAll();
  res.json(categories);
});

router.post('/',
  validatorHandler(createCategorySchema, 'body'),
  async (req, res, next) => {
  try {
    const body = req.body;
    category = await categoriesService.create(body);
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id',
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;
    category = await categoriesService.update(id, body);
    res.json(category);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id',
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
  try {
    const id = req.params.id;
    await categoriesService.delete(id);
    res.json();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
