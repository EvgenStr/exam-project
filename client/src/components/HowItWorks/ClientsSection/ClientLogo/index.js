import React from 'react';
import cx from 'classnames';
import styles from './ClientLogo.module.sass'
import CONSTANTS from '../../../../constants';

function ClientLogo ({ name, imgSrc }) {
  return (
    <div className='col-4 col-lg-3 mb-4 mb-lg-0'>
      <div className='mx-2'>
        <a href='https://google.com'>
          <img
            className={cx(styles.client)}
            alt={name}
            src={`${CONSTANTS.STATIC_IMAGES_PATH}${imgSrc}`}
          />
        </a>
      </div>
    </div>
  );
}

export default ClientLogo;
