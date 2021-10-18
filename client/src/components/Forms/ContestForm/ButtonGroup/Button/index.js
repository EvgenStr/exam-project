import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './Button.module.sass';

function Button ({ data: { badge, description, value }, active, handler }) {
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
Button.propTypes = {
  data: PropTypes.shape({
    badge: PropTypes.string,
    description: PropTypes.string,
    value: PropTypes.string,
  }),
  active: PropTypes.string,
  handler: PropTypes.func,
};
export default Button;
