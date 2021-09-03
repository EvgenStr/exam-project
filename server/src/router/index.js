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

// router.post('/blackList', chatController.blackList);
router.post('/blackList', sqlChat.blackList);

// router.post('/favorite', chatController.favoriteChat);
router.post('/favorite', sqlChat.favoriteChat);

// router.post('/createCatalog', chatController.createCatalog);
router.post('/createCatalog', sqlChat.createCatalog);

// router.post('/getCatalogs', chatController.getCatalogs);
router.post('/getCatalogs', sqlChat.getCatalogs);

// router.post('/updateNameCatalog', chatController.updateNameCatalog);
router.post('/updateNameCatalog', sqlChat.updateNameCatalog);

// router.post('/addNewChatToCatalog', chatController.addNewChatToCatalog);
router.post('/addNewChatToCatalog', sqlChat.addNewChatToCatalog);

// router.post('/removeChatFromCatalog', chatController.removeChatFromCatalog);
router.post('/removeChatFromCatalog', sqlChat.removeChatFromCatalog);

// router.post('/deleteCatalog', chatController.deleteCatalog);
router.post('/deleteCatalog', sqlChat.deleteCatalog);

module.exports = router;
