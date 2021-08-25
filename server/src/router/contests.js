const contestRouter = require('express').Router();
const contestController = require('../controllers/contestController');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const paginate = require('../middlewares/paginate');
const upload = require('../utils/fileUpload');

contestRouter.get('/data', contestController.dataForContest);

contestRouter.get(
  '/customer/:userId/:status',
  paginate,
  contestController.getCustomersContests,
);

contestRouter
  .route('/:contestId')
  .get(basicMiddlewares.canGetContest, contestController.getContestById)
  .patch(upload.updateContestFile, contestController.updateContest);

contestRouter.get(
  '/',
  basicMiddlewares.onlyForCreative,
  contestController.getContests,
);

contestRouter.post(
  '/:contestId/offer',
  upload.uploadLogoFiles,
  basicMiddlewares.canSendOffer,
  contestController.setNewOffer,
);

contestRouter.post(
  '/offer/status',
  basicMiddlewares.onlyForCustomerWhoCreateContest,
  contestController.setOfferStatus,
);

module.exports = contestRouter;

// contestRouter.post(
//   '/pay' ,
//   basicMiddlewares.onlyForCustomer,
//   upload.uploadContestFiles,
//   basicMiddlewares.parseBody,
//   validators.validateContestCreation,
//   userController.payment,
// );
