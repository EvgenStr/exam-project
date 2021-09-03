const chatRouter = require('express').Router();
const chatController = require('../controllers/chatController');

chatRouter.post('/message', chatController.addMessage);
chatRouter.get('/:interlocutorId', chatController.getChat);
chatRouter.get('/preview', chatController.getPreview);
chatRouter.patch('/blacklist', chatController.addToBlackList);
chatRouter.patch('/favorite', chatController.addToFavoriteList);
chatRouter
  .post('/catalog', chatController.createCatalog)
  .get('/catalog', chatController.getCatalogs);
chatRouter.patch('/catalog/name', chatController.updateNameCatalog);
chatRouter.patch('/catalog/add', chatController.addNewChatToCatalog);
chatRouter.patch('/catalog/remove', chatController.removeChatFromCatalog);
chatRouter.delete('/catalog/:catalogId', chatController.deleteCatalog);

module.exports = chatRouter;
