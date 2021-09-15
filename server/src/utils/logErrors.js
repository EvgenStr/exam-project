const fs = require('fs');
const { access, constants, writeFile } = fs;
const path = require('path');
const { LOGS_PATH } = require('../constants');

module.exports = async (err, req, res, next) => {
  const logsPath = path.resolve(LOGS_PATH, 'logs.json');
  const { message, stack, status: code } = err;
  const error = { message, stack, code, time: Date.now() };

  await access(logsPath, constants.W_OK, e => {
    if (e) {
      return writeFile(logsPath, JSON.stringify([error]), 'utf8', async e => {
        if (e) throw e;
      });
    }
    fs.readFile(logsPath, async function readFileCallback (err, data) {
      if (err) {
        // console.log(err);
      } else {
        const obj = await JSON.parse(data);
        // console.log(obj, 'OBJECT+++++++');
        obj.push(error);
        const json = JSON.stringify(obj);
        fs.writeFile(logsPath, json, e => {
          if (e) throw e;
          console.log('The file has been saved!++++++++++++++++++++++++++++++');
        });
      }
    });
  });
  console.log(err.stack, 'LOGER+++++++');
  next(err);
};
