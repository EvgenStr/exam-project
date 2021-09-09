const path = require('path');

const {
  env: {
    SQUADHELP_BANK_NUMBER,
    SQUADHELP_BANK_NAME,
    SQUADHELP_BANK_CVC,
    SQUADHELP_BANK_EXPIRY,
    ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_TIME,
    REFRESH_TOKEN_SECRET,
    REFRESH_TOKEN_TIME,
    MAX_DEVICE_AMOUNT,
    SALT_ROUNDS,
    STATIC_PATH,
    NODE_ENV,
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    APP_NAME,
  },
} = process;

module.exports = {
  APP_NAME: APP_NAME || 'exam-project',
  SQUADHELP_BANK_NUMBER,
  SQUADHELP_BANK_NAME,
  SQUADHELP_BANK_CVC,
  SQUADHELP_BANK_EXPIRY,
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_TIME,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_TIME,
  MAX_DEVICE_AMOUNT,
  SMTP_HOST: SMTP_HOST || '',
  SMTP_PORT: SMTP_PORT || 0,
  SMTP_USER: SMTP_USER || null,
  SMTP_PASS: SMTP_PASS || null,
  SALT_ROUNDS: Number(SALT_ROUNDS),
  STATIC_PATH: STATIC_PATH || path.resolve(__dirname, '../public'),
  NODE_ENV: NODE_ENV || 'development',
  CUSTOMER: 'customer',
  CREATOR: 'creator',
  MODERATOR: 'moderator',
  CREATOR_ENTRIES: 'creator_entries',
  CONTEST_STATUS_ACTIVE: 'active',
  CONTEST_STATUS_FINISHED: 'finished',
  CONTEST_STATUS_PENDING: 'pending',
  CONTESTS_DEFAULT_DIR: 'public/contestFiles/',
  NAME_CONTEST: 'name',
  LOGO_CONTEST: 'logo',
  TAGLINE_CONTEST: 'tagline',
  OFFER_STATUS_PENDING: 'pending',
  OFFER_STATUS_REJECTED: 'rejected',
  OFFER_STATUS_ACCEPTED: 'accepted',
  OFFER_STATUS_DECLINED: 'declined',
  OFFER_STATUS_WON: 'won',
  SOCKET_CONNECTION: 'connection',
  SOCKET_SUBSCRIBE: 'subscribe',
  SOCKET_UNSUBSCRIBE: 'unsubscribe',
  NOTIFICATION_ENTRY_CREATED: 'onEntryCreated',
  NOTIFICATION_CHANGE_MARK: 'changeMark',
  NOTIFICATION_CHANGE_OFFER_STATUS: 'changeOfferStatus',
  NOTIFICATION_NEW_MESSAGE: 'notificationNewMessage',
  NEW_MESSAGE: 'newMessage',
  CHANGE_BLOCK_STATUS: 'CHANGE_BLOCK_STATUS',
};
