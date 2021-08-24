const contestRouter = require('express').Router();
const contestController = require('../controllers/contestController');
const userController = require('../controllers/userController');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const paginate = require('../middlewares/paginate');
const upload = require('../utils/fileUpload');

contestRouter.get('/data', contestController.dataForContest); ///dataForContest
contestRouter.post(
  '/pay' /* '/' */,
  basicMiddlewares.onlyForCustomer,
  upload.uploadContestFiles,
  basicMiddlewares.parseBody,
  validators.validateContestCreation,
  userController.payment,
);
contestRouter.get(
  '/customer/:userId/:status',
  paginate,
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
contestRouter.patch(
  '/:contestId',
  upload.updateContestFile,
  contestController.updateContest,
);
contestRouter.post(
  '/offer',
  upload.uploadLogoFiles,
  basicMiddlewares.canSendOffer,
  contestController.setNewOffer,
);

module.exports = contestRouter;
