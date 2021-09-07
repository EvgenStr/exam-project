import ACTION from '../actions/actionTypes';
import CONSTANTS from '../constants';

const initialState = {
  isFetching: true,
  error: null,
  offers: [],
  page: 1,
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
    default:
      return state;
  }
}

export default moderationOffersReducer;
