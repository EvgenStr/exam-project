import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNowStrict, isAfter } from 'date-fns';
import ProgressBar from './ProgressBar';
import DeleteButton from './DeleteButton';
import styles from './EventsListItem.module.sass';

function EventsListItem ({ event }) {
  const duration = event.endDate - event.startDate;
  const calcProgress = () =>
    Math.ceil(100 - ((event.endDate - Date.now()) / duration) * 100);
  const [progress, setProgress] = useState(calcProgress());
  const getTimeLeft = () =>
    isAfter(event.endDate, Date.now())
      ? formatDistanceToNowStrict(event.endDate)
      : 'time is over';
  const timeLeft = getTimeLeft();

  useEffect(() => {
    let interval;
    if (progress <= 100) {
      interval = setInterval(() => {
        setProgress(calcProgress());
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [progress]);

  return (
    <div className={styles.container}>
      <ProgressBar timeLeft={timeLeft} progress={progress} name={event.name} />
      <DeleteButton startDate={event.startDate} />
    </div>
  );
}
EventsListItem.propTypes = {
  event: PropTypes.object.isRequired,
};
export default EventsListItem;
