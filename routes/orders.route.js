const express = require('express');

const router = express.Router();
const OrdersService = require('./../services/orders.service');
const ordersService = new OrdersService();

const { validatorHandler } = require('./../middlewares/validator.handler');
const { createOrderSchema, getOrderSchema, addItemSchema } = require('./../schemas/order.schema');

router.get('/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
  try {
    const id = req.params.id;
    customer = await ordersService.getById(id);
    res.json(customer);
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const customers = await ordersService.getAll();
    res.json(customers);
  } catch (error) {
    next(error);
  }
});

router.post('/',
  validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
  try {
    const body = req.body;
    customer = await ordersService.create(body);
    res.status(201).json(customer);
  } catch (error) {
    next(error);
  }
});

router.post('/add-item',
  validatorHandler(addItemSchema, 'body'),
  async (req, res, next) => {
  try {
    const body = req.body;
    itemAdded = await ordersService.addItem(body);
    res.status(201).json(itemAdded);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
