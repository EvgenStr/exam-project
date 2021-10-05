import React from 'react';
import CreateEventForm from './CreateEventForm';
import EventsList from './EventsList';
import styles from './Events.module.sass';

function Events () {
  return (
    <div className={styles.container}>
      <CreateEventForm />
      <EventsList />
    </div>
  );
}
export default Events;
