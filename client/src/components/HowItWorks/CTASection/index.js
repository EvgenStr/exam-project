import React from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import LeftFigure from './Figures/LeftFigure';
import styles from './CTASection.module.sass';

function CTASection () {
  return (
    <section
      className={cx(
        styles.bgGradient,
        'position-relative bg-primary text-center  overflow-hidden',
      )}
    >
      <div className={cx(styles.content, 'container py-5 px-2')}>
        <h3 className='h2 text-info fw-bold mb-2'>Ready to get started?</h3>
        <p className='lead text-white mb-3'>
          Fill out your contest brief and begin receiving custom name
          suggestions within minutes.
        </p>
        <Link
          className={'btn btn-light btn-wide transition-3d-hover'}
          to='/startContest'
        >
          Start A Contest
        </Link>
      </div>
      <LeftFigure />
    </section>
  );
}

export default CTASection;
