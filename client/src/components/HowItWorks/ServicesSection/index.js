import React from 'react';
import Card from './Card';
import cardsData from './cardsData.json';

function ServicesSection () {
  const cards = cardsData.map((card,i )=> <Card key={i}  {...card} />);
  return (
    <section className={'container-lg py-5'}>
      <div className={'text-center mx-md-auto mb-5'}>
        <small className={'btn btn-xs btn-soft-primary btn-pill mb-2'}>
          Our Services
        </small>
        <h2 className='fw-normal'>3 Ways To Use Squadhelp</h2>
        <p className='mb-0'>
          Squadhelp offers 3 ways to get you a perfect name for your business.
        </p>
      </div>
      <div className={'row row-cols-1 row-cols-md-3 g-4'}>{cards}</div>
    </section>
  );
}

export default ServicesSection;
