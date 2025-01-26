const express = require('express');
const passport = require('passport');

const AuthService = require('./../services/auth.service');
const authService = new AuthService();

const router = express.Router();

router.post('/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
  try {
    const user = req.user;
    res.json(authService.signToken( user));
  } catch (error) {
    next(error);
  }
});

router.post('/recovery',
  async (req, res, next) => {
  try {
    const { email } = req.body;
    const result = authService.mailRecoveryPassword(email);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/change-password',
  async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;
    const result = await authService.changePassword(token, newPassword);
    res.json(result);
  } catch (error) {
    next(error);
  }
});


module.exports = router;
