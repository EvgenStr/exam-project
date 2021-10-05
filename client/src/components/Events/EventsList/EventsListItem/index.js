import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { formatDistanceToNowStrict, isAfter } from 'date-fns';
import ProgressBar from './ProgressBar';
import CONSTANTS from '../../../../constants';
import { deleteEventAction } from '../../../../actions/actionCreator';
import styles from './EventsListItem.module.sass';

function EventsListItem ({ event }) {
  const dispatch = useDispatch();
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
      <ProgressBar timeLeft={timeLeft} progress={progress} name={event.name} />
      <button
        onClick={() => {
          dispatch(deleteEventAction(event.startDate));
        }}
      >
        <img src={`${CONSTANTS.STATIC_IMAGES_PATH}icons/trash-can.svg`} alt='delete' />
      </button>
    </div>
  );
}
export default EventsListItem;
