import React from 'react';
import { useDispatch } from 'react-redux';
import cx from 'classnames';
import { moderationActionSetStatus } from '../../../../../actions/actionCreator';
import styles from './Buttons.module.sass';

function Buttons ({ id }) {
  const dispatch = useDispatch();
  const buttonHandler = status => {
    dispatch(moderationActionSetStatus({ status, id }));
  };
  return (
    <div className={styles.buttonsContainer}>
      <button
        className={cx(styles.buttons, styles.accept)}
        onClick={() => {
          buttonHandler('accepted');
        }}
      >
        Accept
      </button>
      <button
        className={cx(styles.buttons, styles.decline)}
        onClick={() => {
          buttonHandler('declined');
        }}
      >
        Decline
      </button>
    </div>
  );
}
export default Buttons;
