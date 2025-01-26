const express = require('express');
const passport = require('passport');
const { checkRoles } = require('../middlewares/auth.handler');

const router = express.Router();

const OrdersService = require('./../services/orders.service');
const ordersService = new OrdersService();

const { validatorHandler } = require('./../middlewares/validator.handler');

router.get('/my-orders',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
  try {
    const user = req.user;
    orders = await ordersService.getByUser(user.sub);
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
