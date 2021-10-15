import React from 'react';
import cx from 'classnames';
import styles from './StatsSection.module.sass';
import CONSTANTS from '../../../constants';

function StatsSection () {
  return (
    <section className={'container-lg py-5'}>
      <div className={'row justify-content-lg-center'}>
        <div className={'col-md-4 mb-5 mb-lg-0'}>
          <div
            className={cx(styles.verticalLine, 'text-center px-md-3 px-lg-5')}
          >
            <figure className={cx(styles.icons, 'w-100 mx-auto mb-3')}>
              <img
                alt='stars'
                src={`${CONSTANTS.STATIC_IMAGES_PATH}stars.svg`}
              />
            </figure>
            <p className='mb-0'>
              <span className='text-dark fw-bold'>4.9 out of 5 stars </span>
              from 25,000+ customers.
            </p>
          </div>
        </div>

        <div className={'col-md-4 mb-5 mb-lg-0'}>
          <div
            className={cx(styles.verticalLine, 'text-center px-md-3 px-lg-5')}
          >
            <img
              className={cx(styles.portraits, 'h-100')}
              alt='portraits'
              src={`${CONSTANTS.STATIC_IMAGES_PATH}portraits.png`}
            />
            <p className='mb-0'>
              Our branding community stands{' '}
              <span className='text-dark fw-bold'>200,000+</span> strong.
            </p>
          </div>
        </div>

        <div className={'col-md-4 mb-5 mb-lg-0'}>
          <div className='position-relative text-center px-md-3 px-lg-5'>
            <figure className={cx(styles.icons, 'w-100 mx-auto mb-3')}>
              <img
                alt='sharing-files'
                src={`${CONSTANTS.STATIC_IMAGES_PATH}sharing-files.svg`}
              />
            </figure>
            <p>
              <span className='text-dark fw-bold'>140+ Industries</span>{' '}
              supported across more than
              <span className='text-dark fw-bold'> 85 countries</span>
              <br /> – and counting.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StatsSection;
