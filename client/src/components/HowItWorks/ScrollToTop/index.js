import React from 'react';
import cx from 'classnames';
import styles from './ScrollToTop.module.sass';

function ScrollToTop () {
  return (
    <div className={styles.toTop}>
      <a href='#'>
        <span className={cx(styles.arrow, 'fas fa-arrow-up')}></span>
      </a>
    </div>
  );
}

export default ScrollToTop;
