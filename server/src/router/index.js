const express = require('express');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const userController = require('../controllers/userController');
const TokenMW = require('../middlewares/tokenMW');
const validators = require('../middlewares/validators');
const upload = require('../utils/fileUpload');
const authRouter = require('./auth');
const contestsRouter = require('./contests');
const chatRouter = require('./chat');
const router = express.Router();

router.use('/auth', authRouter);
router.post('/password-reset', userController.resetPassword);
router.post('/password-confirm', userController.confirmationResetPassword);

router.use(TokenMW.checkAccessToken);

router.use('/contests', contestsRouter);
router.use('/chat', chatRouter);

router.post(
  '/pay',
  basicMiddlewares.onlyForCustomer,
  upload.uploadContestFiles,
  basicMiddlewares.parseBody,
  validators.validateContestCreation,
  userController.payment,
);

router.post(
  '/changeMark',
  basicMiddlewares.onlyForCustomer,
  userController.changeMark,
);

router.post('/updateUser', upload.uploadAvatar, userController.updateUser);
// router.post('/getUser', checkToken.checkAuth);

router.post(
  '/cashout',
  basicMiddlewares.onlyForCreative,
  userController.cashout,
);

module.exports = router;
