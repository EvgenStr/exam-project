import React from 'react';
import { useSelector } from 'react-redux';
import OfferItem from './OfferItem';
import styles from './OffersList.module.sass';

function OffersList () {
  const { offers } = useSelector(state => state.moderationOffers);
  const offersList = offers.map(offer => (
    <OfferItem key={offer.id} offer={offer} />
  ));
  return <div className={styles.offersListContainer}>{offersList}</div>;
}
export default OffersList;
