const express = require('express');

const router = express.Router();
const CustomersService = require('./../services/customers.service');
const customersService = new CustomersService();

const { validatorHandler } = require('./../middlewares/validator.handler');
const { createCustomerSchema, updateCustomerSchema, getCustomerSchema } = require('./../schemas/customer.schema');

router.get('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
  try {
    const id = req.params.id;
    customer = await customersService.getById(id);
    res.json(customer);
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res) => {
  const customers = await customersService.getAll();
  res.json(customers);
});

router.post('/',
  validatorHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
  try {
    const body = req.body;
    customer = await customersService.create(body);
    res.status(201).json(customer);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;
    customer = await customersService.update(id, body);
    res.json(customer);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
  try {
    const id = req.params.id;
    await customersService.delete(id);
    res.json();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
