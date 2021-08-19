const WebSocket = require('./WebSocket');
const CONSTANTS = require('../../constants');

class NotificationController extends WebSocket {
  emitNewMessage ({ interlocutorId, sender, dialogId }) {
    this.io
      .to(parseInt(interlocutorId))
      .emit(CONSTANTS.NOTIFICATION_NEW_MESSAGE, { ...sender, dialogId });
  }

  emitEntryCreated (target) {
    this.io.to(parseInt(target)).emit(CONSTANTS.NOTIFICATION_ENTRY_CREATED);
  }

  emitChangeMark (target) {
    this.io.to(parseInt(target)).emit(CONSTANTS.NOTIFICATION_CHANGE_MARK);
  }

  emitChangeOfferStatus (target, message, contestId) {
    this.io
      .to(parseInt(target))
      .emit(CONSTANTS.NOTIFICATION_CHANGE_OFFER_STATUS, { message, contestId });
  }
}

module.exports = NotificationController;
