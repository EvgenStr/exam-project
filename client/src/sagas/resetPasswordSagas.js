import { put } from 'redux-saga/effects';
import ACTION from '../actions/actionTypes';
import * as restController from '../api/http/restController';

export function * resetPasswordSaga (action) {
  try {
    const { data } = yield restController.resetPassword(action.data);
     yield put({ type: ACTION.RESET_PASSWORD_SUCCESS, data });
  } catch (err) {
    yield put({ type: ACTION.RESET_PASSWORD_ERROR, error: err.response });
  }
}

export function * resetPasswordConfirmationSaga (action) {
  try {
    const { data } = yield restController.resetPasswordConfirmation(action.data);
    yield put({ type: ACTION.RESET_PASSWORD_CONFIRM_SUCCESS, data });
  } catch (err) {
    yield put({
      type: ACTION.RESET_PASSWORD_CONFIRM_ERROR,
      error: err.response,
    });
  }
}
