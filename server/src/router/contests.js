const contestRouter = require('express').Router();
const contestController = require('../controllers/contestController');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const upload = require('../utils/fileUpload');

contestRouter.get('/data', contestController.dataForContest); ///dataForContest
contestRouter.post(
  '/pay', /* '/' */
  basicMiddlewares.onlyForCustomer,
  upload.uploadContestFiles,
  basicMiddlewares.parseBody,
  validators.validateContestCreation,
  userController.payment,
);

contestRouter.get(
  '/customer/:userId/:status',
  contestController.getCustomersContests,
);
contestRouter.get(
  '/:contestId',
  basicMiddlewares.canGetContest,
  contestController.getContestById,
);
contestRouter.get(
  '/',
  basicMiddlewares.onlyForCreative,
  contestController.getContests,
);

module.exports = contestRouter;
