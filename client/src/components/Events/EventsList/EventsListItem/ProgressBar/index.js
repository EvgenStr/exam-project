import React from 'react';
import PropTypes from 'prop-types';
import styles from './ProgressBar.module.sass';

function ProgressBar ({ timeLeft, progress, name }) {
  return (
    <div className={styles.container}>
      <span className={styles.name}> {name}</span>
      <span className={styles.timeLeft}> {timeLeft}</span>
      <div
        className={styles.progress}
        style={{ width: `${progress < 100 ? progress : 100}%` }}
      ></div>
    </div>
  );
}
ProgressBar.propTypes = {
  timeLeft: PropTypes.string,
  progress: PropTypes.number,
  name: PropTypes.string,
};
export default ProgressBar;
