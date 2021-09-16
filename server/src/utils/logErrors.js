const fs = require('fs');
const path = require('path');
const { access, constants, writeFile, readFile } = fs;
const { LOGS_PATH } = require('../constants');

module.exports = async (err, req, res, next) => {
  try {
    const logsPath = path.resolve(LOGS_PATH, 'logs.json');
    const { message, stack, status: code } = err;
    const error = { message, stack, code, time: Date.now() };

    await access(logsPath, constants.W_OK, e => {
      if (e) {
        return writeFile(
          logsPath,
          JSON.stringify([error], null, 2),
          'utf8',
          async e => {
            if (e) throw e;
          },
        );
      }
      readFile(logsPath, async (e, data) => {
        if (!e) {
          const oldErrors = await JSON.parse(data);
          oldErrors.push(error);
          const json = JSON.stringify(oldErrors, null, 2);
          writeFile(logsPath, json, e => {
            if (e) throw e;
          });
        }
      });
    });
  } catch (e) {
    console.log(e);
  }
  next(err);
};
