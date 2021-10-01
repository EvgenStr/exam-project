import React from 'react';
import CreateEventForm from './CreateEventForm';
import EventsList from './EventsList'

function Events () {
  return (
    <div>
      <CreateEventForm />
      <EventsList/>
    </div>
  );
}
export default Events;
