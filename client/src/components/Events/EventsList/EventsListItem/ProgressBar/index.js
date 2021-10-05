import React from 'react';
import styles from './ProgressBar.module.sass';

function ProgressBar ({ timeLeft, progress, name }) {
  return (
    <div className={styles.container}>
      <span className={styles.timeLeft}> {timeLeft}</span>
      <div className={styles.progress} style={{ width: `${progress}%` }}>
        <span> {name}</span>
      </div>
    </div>
  );
}

export default ProgressBar;
