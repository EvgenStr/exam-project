import React from 'react';
import AccordionComponent from './AccordionComponent';
import accordionsData from './accordionsData.json';

function Accordions () {
  const accordionsList = accordionsData.map((accordion, i, arr) => {
    return (
      <div id={accordion.id} key={accordion.id} className={'pb-5'}>
        <AccordionComponent {...accordion} />
        {i + 1 !== arr.length && <hr className='mb-5' />}
      </div>
    );
  });
  return <div className={'col-lg-9'}>{accordionsList}</div>;
}

export default Accordions;
