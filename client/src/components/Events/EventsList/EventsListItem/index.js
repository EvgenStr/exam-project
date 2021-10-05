import React, { useState, useEffect } from 'react';
import { formatDistanceToNowStrict, isAfter } from 'date-fns';
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
        console.log('test', progress);
        setProgress(calcProgress());
      }, 1000);
    }
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
