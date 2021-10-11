import React from 'react';
import cx from 'classnames';
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
              <a
                class='btn btn-primary btn-wide btn-pill transition-3d-hover mb-2 mb-sm-0 mr-sm-2'
                href='https://vimeo.com/368584367'
              >
                <small class='mr-2 fas fa-play '></small>
                Play Video
              </a>
            </div>
          </div>
        </div>
        <div className='col-lg-5 mb-4'></div>
      </div>
    </section>
  );
}

export default Banner;
