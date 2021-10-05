import React from 'react';
import { useDispatch } from 'react-redux';
import CONSTANTS from '../../../../../constants';
import { deleteEventAction } from '../../../../../actions/actionCreator';
import styles from './DeleteButton.module.sass';
function DeleteButton ({ startDate }) {
  const dispatch = useDispatch();
  return (
    <button
      className={styles.delete}
      onClick={() => {
        dispatch(deleteEventAction(startDate));
      }}
    >
      <img
        src={`${CONSTANTS.STATIC_IMAGES_PATH}icons/trash-can.svg`}
        alt='delete'
      />
    </button>
  );
}

export default DeleteButton;
