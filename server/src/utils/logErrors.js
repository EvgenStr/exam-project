const path = require('path');
const { LOGS_PATH } = require('../constants');
const { exists, write, mkdir, read } = require('./functions');

module.exports = async (err, req, res, next) => {
  try {
    const logsPath = path.resolve(LOGS_PATH, 'logs.json');
    const { message, stack: stackTrace, status: code } = err;
    const error = { message, stackTrace, code, time: Date.now() };

    const fileIsExist = await exists(logsPath);

    if (!fileIsExist) {
      await mkdir(LOGS_PATH);
      await write(logsPath, [error]);
      return;
    }
    const errors = await read(logsPath);
    if(!errors) return await write(logsPath, [error]);
    errors.push(error);
    await write(logsPath, errors);
  } catch (e) {
    console.log(e, 'error');
  }
  next(err);
};
