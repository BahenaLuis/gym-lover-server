const express = require('express');

const router = express.Router();
const UsersService = require('./../services/user.service');
const usersService = new UsersService();

const { validatorHandler } = require('./../middlewares/validator.handler');
const { createUserSchema, updateUserSchema, getUserSchema } = require('./../schemas/user.schema');

router.get('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
  try {
    const id = req.params.id;
    user = await usersService.getById(id);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res) => {
  const users = await usersService.getAll();
  res.json(users);
});

router.post('/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
  try {
    const body = req.body;
    user = await usersService.create(body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;
    user = await usersService.update(id, body);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
  try {
    const id = req.params.id;
    await usersService.delete(id);
    res.json();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
