import React from 'react';
import cx from 'classnames';
import ModalVideo from './ModalVideo';
import styles from './Banner.module.sass';

function Banner () {
  return (
    <section className={cx('container', styles.banner)}>
      <div className='row'>
        <div className='col-lg-7 mb-7 mb-lg-0'>
          <span className='btn btn-xs btn-soft-primary btn-pill mb-2'>
            World's #1 Naming Platform
          </span>
          <div className='mb-4'>
            <h1 className={styles.title}>How Does Squadhelp Work?</h1>
            <p>
              Squadhelp helps you come up with a great name for your business by
              combining the power of crowdsourcing with sophisticated technology
              and Agency-level validation services.
            </p>
            <div className={styles.player}>
              <ModalVideo />
            </div>
          </div>
        </div>
        <div className='col-lg-5 mb-4'></div>
      </div>
    </section>
  );
}

export default Banner;
