const express = require('express');

const router = express.Router();
const ProductsService = require('./../services/products.service');
const productsService = new ProductsService();

const { validatorHandler } = require('./../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('./../schemas/product.schema');

router.get('/', async (req, res) => {
  const products = await productsService.getAll();
  res.json(products);
});

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
  try {
    const id = req.params.id;
    product = await productsService.getById(id);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
  try {
    const body = req.body;
    product = await productsService.create(body);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;
    product = await productsService.update(id, body);
    res.json({
      message: 'updated',
      data: product,
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
  try {
    const id = req.params.id;
    await productsService.remove(id);
    res.json({
      message: 'deleted',
      id: id,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
