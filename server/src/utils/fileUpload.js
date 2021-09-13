const fs = require('fs');
const path = require('path');
const multer = require('multer');
const ServerError = require('../errors/ServerError');
const { STATIC_PATH, NODE_ENV } = require('../constants');
const filePath =
  NODE_ENV === 'production'
    ? '/var/www/html/images/'
    : path.resolve(STATIC_PATH, 'images');

if (!fs.existsSync(filePath)) {
  fs.mkdirSync(filePath, {
    recursive: true,
  });
}

const storage = multer.diskStorage({
  destination (req, file, cb) {
    cb(null, filePath);
  },
  filename (req, file, cb) {
    cb(null, `${Date.now()}.${file.originalname}`);
  },
});

const uploadAvatars = multer({ storage }).single('file');
const uploadContestFiles = multer({
  storage,
}).array('files', 3);
const updateContestFile = multer({ storage }).single(
  'file',
);
const uploadLogoFiles = multer({ storage }).single(
  'offerData',
);

module.exports.uploadAvatar = (req, res, next) => {
  uploadAvatars(req, res, err => {
    if (err) {
      next(new ServerError(err));
    }
    return next();
  });
};

module.exports.uploadContestFiles = (req, res, next) => {
  uploadContestFiles(req, res, err => {
    if (err) {
      next(new ServerError(err));
    }
    return next();
  });
};

module.exports.updateContestFile = (req, res, next) => {
  updateContestFile(req, res, err => {
    if (err) {
      next(new ServerError(err));
    }
    return next();
  });
};

module.exports.uploadLogoFiles = (req, res, next) => {
  uploadLogoFiles(req, res, err => {
    if (err) {
      next(new ServerError(err));
    }
    return next();
  });
};
