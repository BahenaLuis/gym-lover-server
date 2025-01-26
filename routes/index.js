const express = require('express');

const productsRouter = require('./products.router');
const usersRouter = require('./users.router');
const customersRouter = require('./customers.route');
const categoriesRouter = require('./categories.route');
const ordersRouter = require('./orders.route');
const authRouter = require('./auth.route');
const profileRouter = require('./profile.route');

function routerApi(app) {
  //main router
  const router = express.Router();
  app.use('/api/v1', router);

  //add subrouters
  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/customers', customersRouter);
  router.use('/categories', categoriesRouter);
  router.use('/orders', ordersRouter);
  router.use('/auth', authRouter);
  router.use('/profile', profileRouter);
}

module.exports = routerApi;
