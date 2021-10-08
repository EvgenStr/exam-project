import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearEventsBadgesAction } from '../../../actions/actionCreator';
import EventsListItem from './EventsListItem';
import styles from './EventsList.module.sass';

function EventsList () {
  const { events } = useSelector(state => state.events);
  const dispatch = useDispatch();

  const eventsList = events.map(event => (
    <EventsListItem key={event.startDate} event={event} />
  ));

  useEffect(() => {
    dispatch(clearEventsBadgesAction());
  }, [dispatch]);

  return <div className={styles.container}>{eventsList}</div>;
}
export default EventsList;
