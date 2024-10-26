const express = require('express');

const router = express.Router();
const ProductsService = require('./../services/products.service');
const productsService = new ProductsService();

const { validatorHandler } = require('./../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('./../schemas/product.schema');

router.get('/', (req, res) => {
  res.json(productsService.getAll());
});

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  (req, res, next) => {
  try {
    const id = req.params.id;
    product = productsService.getById(id);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  (req, res, next) => {
  try {
    const body = req.body;
    product = productsService.create(body);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;
    product = productsService.update(id, body);
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
  (req, res, next) => {
  try {
    const id = req.params.id;
    productsService.remove(id);
    res.json({
      message: 'deleted',
      id: id,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
