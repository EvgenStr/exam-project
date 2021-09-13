import { put } from 'redux-saga/effects';
import ACTION from '../actions/actionTypes';
import * as Api from '../api/http';

export function * resetPasswordSaga (action) {
  try {
    const { data } = yield Api.auth.reset(action.data);
    yield put({ type: ACTION.RESET_PASSWORD_SUCCESS, data });
  } catch (err) {
    yield put({ type: ACTION.RESET_PASSWORD_ERROR, error: err.response });
  }
}

export function * resetPasswordConfirmSaga (action) {
  try {
    const { data } = yield Api.auth.resetConfirm(action.data);
    yield put({ type: ACTION.RESET_PASSWORD_CONFIRM_SUCCESS, data });
  } catch (err) {
    yield put({
      type: ACTION.RESET_PASSWORD_CONFIRM_ERROR,
      error: err.response,
    });
  }
}
