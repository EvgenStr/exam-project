import { combineReducers } from 'redux';
import authReducer from './authReducer';
import dataForContestReducer from './dataForContestReducer';
import payReducer from './payReducer';
import getContestsReducer from './getContestsReducer';
import storeContestReducer from './storeContestReducer';
import bundleReducer from './bundleReducer';
import getContestByIdReducer from './getContestByIdReducer';
import updateContestReducer from './updateContestReducer';
import chatReducer from './chatReducer';
import userProfileReducer from './userProfileReducer';
import moderationOffersReducer from './moderationOffersReducer';
import resetPasswordReducer from './resetPasswordReducer';
import eventsReducer from './eventsReducer';

const appReducer = combineReducers({
  auth: authReducer,
  dataForContest: dataForContestReducer,
  payment: payReducer,
  contestByIdStore: getContestByIdReducer,
  contestsList: getContestsReducer,
  contestStore: storeContestReducer,
  bundleStore: bundleReducer,
  updateContestStore: updateContestReducer,
  chatStore: chatReducer,
  userProfile: userProfileReducer,
  moderationOffers: moderationOffersReducer,
  resetPassword: resetPasswordReducer,
  events: eventsReducer,
});

export default appReducer;
