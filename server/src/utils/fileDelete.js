const fs = require('fs');
const path = require('path');
const { STATIC_PATH, NODE_ENV } = require('../constants');
const filePath =
  NODE_ENV === 'production'
    ? '/var/www/html/images/'
    : path.resolve(STATIC_PATH, 'images');

module.exports = fileName => {
  fs.unlink(path.resolve(filePath, fileName), err => {
    console.log(`${fileName} was deleted`);
  });
};
