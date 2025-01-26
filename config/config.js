require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 3000,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  jwtSecret: process.env.JWT_SECRET,

  smptHost: process.env.SMTP_HOST,
  smptPort: process.env.SMTP_PORT,
  smptUser: process.env.SMTP_USER,
  smtpPass: process.env.SMTP_PASS
}

module.exports = config;
