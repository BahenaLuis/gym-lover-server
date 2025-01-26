//const sequelize = require('../libs/sequelize');
const boom = require('@hapi/boom');
const config = require('./../config/config');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const UsersService = require('./user.service');
const usersService = new UsersService();

class AuthService {

  async getUser(email, password) {
    const user = await usersService.getByEmail(email);
      if (!user) {
        throw boom.unauthorized();
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw boom.unauthorized();
      }
      delete user.dataValues.password;
      return user;
  }

  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role
    }
    const token = jwt.sign(payload, config.jwtSecret);
    return {
      user,
      token
    };
  }

  async mailRecoveryPassword(email) {
    const user = await usersService.getByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }

    //TO-DO, use a different secret to recovery pass process
    const payload = { sub: user.id };
    const token = jwt.sign(payload, config.jwtSecret, {expiresIn: '15min'});
    const link = `https://gymlover.com/recovery?token=${token}`;

    await usersService.update(user.id, { recoveryToken: token });

    const message =
    `<b>
      Please, enter to the following link to reset your password
      ${link}
    </b>`;

    const emailData = {
      from: '"Gym Lover" <gymlover@gmail.com>',
      to: email,
      subject: "Recovery Password",
      html: message,
    };
    const result = await this.sendMail(emailData);
    return result;
  }

  async changePassword(token, newPassword) {
    try {
      const payload = jwt.verify(token, config.jwtSecret);

      const user = await usersService.getById(payload.sub);
      if (user.recoveryToken !== token) {
        throw boom.unauthorized();
      }
      const hash = await bcrypt.hash(newPassword, 10);
      await usersService.update(user.id, { recoveryToken: null, password: hash });

      return { message: 'Password changed' };
    } catch (error) {
      throw boom.unauthorized();
    }
  }

  async sendMail(emailData) {
    const transporter = nodemailer.createTransport({
      host: config.smptHost,
      port: config.smptPort,
      secure: true,
      auth: {
        user: config.smptUser,
        pass: config.smtpPass
      }
    });

    await transporter.sendMail(emailData);
    return { message: "notification sent" };
  }
}

module.exports = AuthService;
