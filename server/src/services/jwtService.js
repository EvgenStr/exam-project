const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const {
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_TIME,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_TIME,
  RESET_TOKEN_SECRET,
  RESET_TOKEN_TIME,
} = require('../constants');
const signJWT = promisify(jwt.sign);
const verifyJWT = promisify(jwt.verify);

const tokenConfig = {
  access: {
    secret: ACCESS_TOKEN_SECRET,
    time: ACCESS_TOKEN_TIME,
  },
  refresh: {
    secret: REFRESH_TOKEN_SECRET,
    time: REFRESH_TOKEN_TIME,
  },
  reset: {
    secret: RESET_TOKEN_SECRET,
    time: RESET_TOKEN_TIME,
  },
};

const createToken = async (payload, { time, secret }) => {
  const accessToken = await signJWT(
    {
      userId: payload.id,
      email: payload.email,
      role: payload.role,
    },
    secret,
    { expiresIn: time },
  );

  return accessToken;
};

module.exports.createTokenPair = async payload => {
  return {
    access: await createToken(payload, tokenConfig.access),
    refresh: await createToken(payload, tokenConfig.refresh),
  };
};

const verifyToken = (token, { secret }) => verifyJWT(token, secret);

module.exports.verifyAccessToken = token =>
  verifyToken(token, tokenConfig.access);

module.exports.verifyRefreshToken = token =>
  verifyToken(token, tokenConfig.refresh);

module.exports.createResetToken = async password => {
  const {
    reset: { secret, time },
  } = tokenConfig;
  return await signJWT(
    {
      password,
    },
    secret,
    { expiresIn: time },
  );
};
module.exports.verifyResetToken = token =>
  verifyToken(token, tokenConfig.reset);
