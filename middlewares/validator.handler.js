const boom = require('@hapi/boom');

function validatorHandler(schema, property) {
  return (req, res, next) => {
    const data = req[property];

    const config = {
      abortEarly: false
    };

    const {error} = schema.validate(data, config);
    if (error) {
      next(boom.badRequest(error));
    }
    next();
  }
}

module.exports = { validatorHandler };
