import React from 'react';
import Nav from './Nav';
import Accordions from './Accordions';

function FAQTopics () {
  return (
    <section className={'container-lg mt-5'}>
      <div className={'row'}>
        <div className={'col-lg-3 mb-5 mb-lg-0'}>
          <Nav />
        </div>
          <Accordions />
      </div>
    </section>
  );
}

export default FAQTopics;
