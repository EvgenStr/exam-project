import React from 'react';
import AccordionComponent from './AccordionComponent';
import accordionsData from './accordionsData.json';

function Accordions () {
  const accordionsList = accordionsData.map((accordion, i, arr) => {
    return (
      <>
        <AccordionComponent key={accordion.id} {...accordion} />
        {i + 1 !== arr.length && <hr key={i} className='mb-5' />}
      </>
    );
  });
  return <div className={'col-lg-9'}>{accordionsList}</div>;
}

export default Accordions;
