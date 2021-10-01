import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getEventsAction } from '../../../actions/actionCreator';
import EventsListItem from './EventsListItem';

function EventsList () {
  const {
    events: { events },
    auth: {
      data: { id },
    },
  } = useSelector(state => state);
  const dispatch = useDispatch();
  const eventsList = events.map(event => (
    <EventsListItem key={event.startDate} event={event} />
  ));
  useEffect(() => {
    dispatch(getEventsAction(id));
  }, []);

  return <div>{eventsList}</div>;
}
export default EventsList;
