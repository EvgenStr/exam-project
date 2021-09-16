const fs = require('fs');
const path = require('path');
const { access, constants, writeFile, readFile } = fs;
const { LOGS_PATH } = require('../constants');

module.exports = async () => {
  try {
    const oldLogsPath = path.resolve(LOGS_PATH, 'logs.json');
    const newLogsPath = path.resolve(LOGS_PATH, `${Date.now()}.json`);

    await readFile(oldLogsPath, async (e, data) => {
      if (!e && JSON.parse(data).length) {
        writeFile(newLogsPath, data, e => {
          if (e) throw e;
        });
      }
    });

    await writeFile(oldLogsPath, JSON.stringify([], null, 2), e => {
      if (e) throw e;
    });
  } catch (e) {
    console.log(e);
  }
};
