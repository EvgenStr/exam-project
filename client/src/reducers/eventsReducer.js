import ACTION from '../actions/actionTypes';
import CONSTANTS from '../constants';

const initialState = {
  events: [],
  badges: 0,
};

function eventsReducer (state = initialState, action) {
  switch (action.type) {
    case ACTION.CREATE_EVENT: {
      const events = JSON.parse(
        localStorage.getItem(CONSTANTS.EVENT_STORAGE) || '[]',
      );
      events.push(action.data);
      localStorage.setItem(CONSTANTS.EVENT_STORAGE, JSON.stringify(events));
      return { ...state, events };
    }
    case ACTION.GET_EVENTS: {
      const AllEvents = JSON.parse(
        localStorage.getItem(CONSTANTS.EVENT_STORAGE) || '[]',
      );
      const events = AllEvents.filter(event => event.id === action.data);
      events.sort((a, b) => a.endDate - b.endDate);
      return { ...state, events };
    }
    case ACTION.DELETE_EVENT: {
      const oldEvents = JSON.parse(
        localStorage.getItem(CONSTANTS.EVENT_STORAGE) || '[]',
      );
      const events = oldEvents.filter(event => event.startDate !== action.data);
      localStorage.setItem(CONSTANTS.EVENT_STORAGE, JSON.stringify(events));
      return { ...state, events };
    }
    case ACTION.ADD_EVENT_BADGE: {
      return { ...state, badges: state.badges + 1 };
    }
    case ACTION.CLEAR_EVENTS_BADGES: {
      return { ...state, badges: 0 };
    }
    default:
      return state;
  }
}
export default eventsReducer;
