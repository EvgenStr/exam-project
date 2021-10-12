import React from 'react';
import { Link } from 'react-router-dom';
import CONSTANTS from '../../../../constants';

function Card ({ title, description, logo, button }) {
  return (
    <div className={'col'}>
    <div className={'card h-100 text-center mb-4 mb-md-0'}>
      <div className={'card-body px-3 py-5'}>
        <div className={'mb-4'}>
          <img src={`${CONSTANTS.STATIC_IMAGES_PATH}${logo}.png`} alt={logo} />
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <Link to='/startContest'>
          <span className={'btn btn-primary btn-wide transition-3d-hover'}>
            {button}
          </span>
        </Link>
      </div>
    </div>
    </div>
  );
}

export default Card;
