import ACTION from '../actions/actionTypes';

const initialState = {
  events: [],
};

function eventsReducer (state = initialState, action) {
  switch (action.type) {
    case ACTION.CREATE_EVENT: {
      const events = JSON.parse(localStorage.getItem('events') || '[]');
      events.push(action.data);
      localStorage.setItem('events', JSON.stringify(events));
      return { events };
    }
    case ACTION.GET_EVENTS: {
      const AllEvents = JSON.parse(localStorage.getItem('events') || '[]');
      const events = AllEvents.filter(event => event.id === action.data);
      return { events };
    }
    case ACTION.DELETE_EVENT: {
      const oldEvents = JSON.parse(localStorage.getItem('events') || '[]');
      const events = oldEvents.filter(event => event.date !== action.data.date);
      return { events };
    }

    default:
      return state;
  }
}
export default eventsReducer;
