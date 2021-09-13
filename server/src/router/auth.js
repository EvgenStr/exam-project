const authRouter = require('express').Router();
const AuthController = require('../controllers/authController');
const validators = require('../middlewares/validators');
const TokenMW = require('../middlewares/tokenMW');

authRouter.post('/sign-in', validators.validateLogin, AuthController.signIn);
authRouter.post(
  '/sign-up',
  validators.validateRegistrationData,
  AuthController.signUp,
);
authRouter.post('/refresh', TokenMW.checkRefreshToken, AuthController.refresh);
authRouter.post('/password-reset', AuthController.reset);
authRouter.post('/password-confirm', AuthController.confirmResetPassword);

module.exports = authRouter;
