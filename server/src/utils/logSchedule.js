const path = require('path');
const { write, read } = require('./functions');
const { LOGS_PATH } = require('../constants');

module.exports = async () => {
  try {
    const oldLogsPath = path.resolve(LOGS_PATH, 'logs.json');
    const newLogsPath = path.resolve(LOGS_PATH, `${Date.now()}.json`);

    const oldErrors = await read(oldLogsPath);
    if (!oldErrors) return;

    if (oldErrors.length) {
      oldErrors.forEach(err => (err.stackTrace = undefined));
      await write(newLogsPath, oldErrors);
      await write(oldLogsPath);
    }
  } catch (e) {
    console.log(e);
  }
};
