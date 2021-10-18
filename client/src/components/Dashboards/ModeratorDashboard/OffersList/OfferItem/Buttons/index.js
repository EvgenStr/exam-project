import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';
import cx from 'classnames';
import { moderationActionSetStatus } from '../../../../../../actions/actionCreator';
import styles from './Buttons.module.sass';
import CONSTANTS from '../../../../../../constants';

function Buttons ({ id, status }) {
  const dispatch = useDispatch();
  const buttonHandler = status => {
    confirmAlert({
      title: 'confirm',
      message: 'Are u sure?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => dispatch(moderationActionSetStatus({ status, id })),
        },
        {
          label: 'No',
        },
      ],
    });
  };

  return (
    <div className={styles.buttonsContainer}>
      {status !== CONSTANTS.OFFER_STATUS_ACCEPTED && (
        <button
          className={cx(styles.buttons, styles.accept)}
          onClick={() => {
            buttonHandler(CONSTANTS.OFFER_STATUS_ACCEPTED);
          }}
        >
          Accept
        </button>
      )}
      {status !== CONSTANTS.OFFER_STATUS_DECLINED && (
        <button
          className={cx(styles.buttons, styles.decline)}
          onClick={() => {
            buttonHandler(CONSTANTS.OFFER_STATUS_DECLINED);
          }}
        >
          Decline
        </button>
      )}
    </div>
  );
}
Buttons.propTypes = {
  id: PropTypes.node,
  status: PropTypes.string,
};
export default Buttons;
