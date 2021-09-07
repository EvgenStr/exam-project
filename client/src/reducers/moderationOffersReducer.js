import ACTION from '../actions/actionTypes';
import CONSTANTS from '../constants';

const initialState = {
  isFetching: true,
  error: null,
  offers: [],
  count: 0,
 };

function moderationOffersReducer (state = initialState, action) {
  switch (action.type) {
    case ACTION.GET_OFFERS_FOR_MODERATOR_REQUEST: {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    }
    case ACTION.GET_OFFERS_FOR_MODERATOR_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        offers: [...action.data.offers],
        count: action.data.count,
      };
    }
    case ACTION.GET_OFFERS_FOR_MODERATOR_ERROR: {
      return { ...state, isFetching: false, error: action.error, offers: [] };
    }
    default:
      return state;
  }
}

export default moderationOffersReducer;
