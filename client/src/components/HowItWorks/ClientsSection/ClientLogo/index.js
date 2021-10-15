import React from 'react';

function ClientLogo () {
  return (
    <div className='col-4 col-lg-3 mb-4 mb-lg-0'>
      <div className='mx-2'>
        <a href="https://google.com">
          <img
            className='u-clients lazy loaded'
            alt='forbes'
            src='/resources/assets/imgs/front/forbes.svg'

          />
        </a>
      </div>
    </div>
  );
}

export default ClientLogo;
