import React from 'react';
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

export default ProgressBar;
