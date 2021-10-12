import React from 'react';
import cx from 'classnames';
import styles from './ListItem.module.sass';


function ListItem ({ data, index }) {
  return (
    <li className={cx('py-3', styles.steps)}>
      <div className='d-flex align-items-center border rounded p-5'>
        <div className='d-flex me-3'>
          <span className='display-4 text-primary fw-normal'>{`${index +
            1}.`}</span>
        </div>
        <div className={styles.mediaBody}>
          <p className='mb-0'>{data}</p>
        </div>
      </div>
    </li>
  );
}

export default ListItem;
