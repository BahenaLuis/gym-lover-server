const express = require('express');

const productsRouter = require('./products.router');

function routerApi(app) {
  //main router
  const router = express.Router();
  app.use('/api/v1', router);

  //add subrouters
  router.use('/products', productsRouter);
}

module.exports = routerApi;
