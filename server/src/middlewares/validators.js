const schemas = require('../validationSchemas/schemas');
const BadRequestError = require('../errors/BadRequestError');

module.exports.validateRegistrationData = async (req, res, next) => {
  const validationResult = await schemas.registrationSchema.isValid(req.body);
  if (validationResult) {
    return next();
  }

  next(new BadRequestError('Invalid data for registration'));
};

module.exports.validateLogin = async (req, res, next) => {
  const validationResult = await schemas.loginSchema.isValid(req.body);
  if (validationResult) {
    return next();
  }
  next(new BadRequestError('Invalid data for login'));
};

module.exports.validateContestCreation = (req, res, next) => {
  const promiseArray = [];
  req.body.contests.forEach(el => {
    promiseArray.push(schemas.contestSchema.isValid(el));
  });
  return Promise.all(promiseArray)
    .then(results => {
      results.forEach(result => {
        if (!result) {
          return next(new BadRequestError());
        }
      });
      next();
    })
    .catch(err => {
      next(err);
    });
};
