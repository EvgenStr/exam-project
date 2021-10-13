import React from 'react';
import ListItem from './ListItem';
import CONSTANTS from '../../../constants';
import featuresData from './featuresData.json';

function FeaturesSection () {
  const listItems = featuresData.map((item, i) => (
    <ListItem key={i} data={item} index={i} />
  ));
  return (
    <section className={'container-lg py-5'}>
      <div className={'text-center mx-md-auto mb-5'}>
        <img
          src={`${CONSTANTS.STATIC_IMAGES_PATH}features.png`}
          alt='features'
        />
        <h2 className={'fw-normal'}>How Do Naming Contests Work?</h2>
      </div>
      <div className={'row align-items-lg-center'}>
        <div className={'col-lg-6 order-lg-2 mb-5 mb-lg-0'}>
          <ul className={'list-unstyled'}>{listItems}</ul>
        </div>
        <div className={'col-lg-6 order-lg-1'}>
          <div className={'pe-lg-5'}>
            <img
              className={'w-100'}
              src={`${CONSTANTS.STATIC_IMAGES_PATH}features-user.png`}
              alt='user'
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
