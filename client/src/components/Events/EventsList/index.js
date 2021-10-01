import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getEventsAction } from '../../../actions/actionCreator';

function EventList () {
  const { events } = useSelector(state => state.events);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEventsAction());
  }, []);

  return <div>{JSON.stringify(events)}</div>;
}
export default EventList;
