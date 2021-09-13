const createHttpError = require('http-errors');
const bcrypt = require('bcrypt');
const { User, RefreshToken, ResetToken } = require('../models');
const AuthService = require('../services/authService');
const JwtService = require('../services/jwtService');
const { resetPasswordMail } = require('../services/mailService');
const CONSTANTS = require('../constants');

module.exports.signIn = async (req, res, next) => {
  try {
    const {
      body: { email, password },
    } = req;
    const user = await User.findOne({
      where: { email },
    });

    if (user && (await user.comparePassword(password))) {
      const data = await AuthService.createSession(user);
      data.user.password = undefined;
      return res.send({ data });
    }
    next(createHttpError(401, 'Invalid credentials'));
  } catch (error) {
    next(error);
  }
};

module.exports.signUp = async (req, res, next) => {
  try {
    const { body } = req;
    const user = await User.create(body);
    if (user) {
      const data = await AuthService.createSession(user);
      data.user.password = undefined;
      return res.send({ data });
    }
    next(createHttpError(406, 'User already exists'));
  } catch (error) {
    next(error);
  }
};

module.exports.refresh = async (req, res, next) => {
  try {
    const {
      body: { refreshToken }, // refresh token is not expired
    } = req;

    const refreshTokenInstance = await RefreshToken.findOne({
      where: {
        value: refreshToken,
      },
    });

    const data = await AuthService.refreshSession(refreshTokenInstance);
    data.user.password = undefined;
    res.send({ data });
  } catch (error) {
    next(error);
  }
};

module.exports.reset = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(createHttpError(406, 'User not found'));
    }
    const hasPassword = await bcrypt.hash(password, CONSTANTS.SALT_ROUNDS);
    const token = await AuthService.getResetToken(hasPassword);
    const [resetToken, created] = await ResetToken.findOrCreate({
      where: { userId: user.id },
      defaults: {
        value: token,
      },
    });

    if (!created) {
      await resetToken.update({ value: token });
    }
    await resetPasswordMail(email, token);

    res.send(token);
  } catch (error) {
    next(error);
  }
};

module.exports.confirmResetPassword = async (req, res, next) => {
  try {
    const { token } = req.body;
    const { User: userInstance } = await ResetToken.findOne({
      where: { value: token },
      include: [{ model: User }],
    });
    const { password } = await JwtService.verifyResetToken(token);
    await userInstance.update({ password });
    res.status(200).send('password has been changed');
  } catch (error) {
    next(error);
  }
};
