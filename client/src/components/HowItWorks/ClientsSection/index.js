import React from 'react';
import clientsData from './clientsData.json';

function ClientsSection () {
  return (
    <section className='container-md'>
      <div className='row align-items-lg-center mb-4'>
        <div className='col-md-5 col-lg-4'>
          <div className='pl-md-4'>
            <h6 className='fs-2 pt-5'>Featured In</h6>
          </div>
        </div>
        <div className='col-md-7 col-lg-8 mb-5 mb-md-0'>
          <div className='row justify-content-center border-top pt-5'></div>
        </div>
      </div>
    </section>
  );
}

export default ClientsSection;
