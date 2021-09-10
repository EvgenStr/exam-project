import { put } from 'redux-saga/effects';
import ACTION from '../actions/actionTypes';
import * as Api from '../api/http'

export function * resetPasswordSaga (action) {
  try {
    const { data } = yield Api.auth.reset(action.data);
    yield put({ type: ACTION.RESET_PASSWORD_SUCCESS, data });
  } catch (err) {
    yield put({ type: ACTION.RESET_PASSWORD_ERROR, error: err.response });
  }
}
