import ACTION from '../actions/actionTypes';

const initialState = {
  isFetching: false,
  error: null,
  data: null,
};

function resetPasswordReducer (state = initialState, action) {
  switch (action.type) {
    case ACTION.RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    }
    case ACTION.RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        data: action.data,
        isFetching: false,
        error: null,
      };
    }
    case ACTION.RESET_PASSWORD_ERROR: {
      return { ...state, isFetching: false, error: action.error };
    }
    case ACTION.RESET_PASSWORD_CONFIRM_REQUEST: {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    }
    case ACTION.RESET_PASSWORD_CONFIRM_SUCCESS: {
      return {
        ...state,
        data: action.data,
        isFetching: false,
        error: null,
      };
    }
    case ACTION.RESET_PASSWORD_CONFIRM_ERROR: {
      return { ...state, isFetching: false, error: action.error };
    }
    case ACTION.CLEAR_PASSWORD_RESET_ERROR: {
      return { ...state, error: null };
    }
    default:
      return state;
  }
}

export default resetPasswordReducer;
