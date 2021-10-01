import React, { useState, useEffect } from 'react';
import { formatDistanceToNowStrict, isAfter } from 'date-fns';
import styles from './EventsListItem.module.sass';

function EventsListItem ({ event }) {
  const duration = event.endDate - event.startDate;
  const [progress, setProgress] = useState(
    Math.ceil(100 - ((event.endDate - Date.now()) / duration) * 100),
  );
  const getTimeLeft = () => {
    if (isAfter(event.endDate, Date.now())) {
      return formatDistanceToNowStrict(event.endDate);
    }
    return 'time is over';
  };
  const timeLeft = getTimeLeft();

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('test', progress);
      setProgress(
        Math.ceil(100 - ((event.endDate - Date.now()) / duration) * 100),
      );
    }, 1000);
    return () => clearInterval(interval);
  }, [progress]);

  return (
    <div className={styles.container}>
      <span> {timeLeft}</span>
      <div className={styles.progress} style={{ width: `${progress}%` }}>
        <span> {event.name}</span>
      </div>
    </div>
  );
}
export default EventsListItem;
