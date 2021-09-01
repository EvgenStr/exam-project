const express = require('express');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const userController = require('../controllers/userController');
const TokenMW = require('../middlewares/tokenMW');
const validators = require('../middlewares/validators');
const chatController = require('../controllers/chatController');
const sqlChat = require('../controllers/SQLchatController');
const upload = require('../utils/fileUpload');
const authRouter = require('./auth');
const contestsRouter = require('./contests');
const router = express.Router();

router.use('/auth', authRouter);

router.use(TokenMW.checkAccessToken);

router.post(
  '/pay',
  basicMiddlewares.onlyForCustomer,
  upload.uploadContestFiles,
  basicMiddlewares.parseBody,
  validators.validateContestCreation,
  userController.payment,
);
router.use('/contests', contestsRouter);

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

// router.post('/newMessage', chatController.addMessage);
router.post('/newMessage', sqlChat.addMessage);

// router.post('/getChat', chatController.getChat);
router.post('/getChat', sqlChat.getChat);

// router.post('/getPreview', chatController.getPreview);
router.post('/getPreview', sqlChat.getPreview);

router.post('/blackList', chatController.blackList);

router.post('/favorite', chatController.favoriteChat);

router.post('/createCatalog', chatController.createCatalog);

router.post('/updateNameCatalog', chatController.updateNameCatalog);

router.post('/addNewChatToCatalog', chatController.addNewChatToCatalog);

router.post('/removeChatFromCatalog', chatController.removeChatFromCatalog);

router.post('/deleteCatalog', chatController.deleteCatalog);

router.post('/getCatalogs', chatController.getCatalogs);

module.exports = router;
