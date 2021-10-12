import React from 'react';
import styles from './ServicesSection.module.sass';

function ServicesSection () {
  return (
    <div className={'container'}>
      <div className={'w-md-80 w-lg-80 text-center mx-md-auto mb-5'}>
        <small class='btn btn-xs btn-soft-primary btn-pill mb-2'>
          Our Services
        </small>
        <h2 class='font-weight-normal'>3 Ways To Use Squadhelp</h2>
        <p class='mb-0'>
          Squadhelp offers 3 ways to get you a perfect name for your business.
        </p>
      </div>
    </div>
  );
}

export default ServicesSection;
