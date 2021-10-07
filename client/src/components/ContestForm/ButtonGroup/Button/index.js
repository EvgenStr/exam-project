import React from 'react';
import cx from 'classnames';
import styles from './Button.module.sass';

function Button ({ data: { badge, description, value }, active, handler }) {
  console.log(active, 'button');
  return (
    <div
      className={cx(styles.container, value === active ? styles.active : '')}
      onClick={() => {
        handler(value);
      }}
    >
      <div className={styles.card}>
        <div className={styles.badgeContainer}>
          <span
            className={cx(
              styles.badge,
              value === active ? styles.activeBadge : '',
            )}
          >
            {badge}
          </span>
        </div>
        <h5 className={styles.description}>{description}</h5>
      </div>
    </div>
  );
}

export default Button;
