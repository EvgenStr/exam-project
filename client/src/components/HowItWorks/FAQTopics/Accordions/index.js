import React from 'react';
import AccordionComponent from './AccordionComponent';
import accordionsData from './accordionsData.json';

function Accordions () {
  const accordionsList = accordionsData.map((accordion, i) => (
    <AccordionComponent key={i} {...accordion} />
  ));
  return <div className={'col-lg-9'}>{accordionsList}</div>;
}

export default Accordions;
