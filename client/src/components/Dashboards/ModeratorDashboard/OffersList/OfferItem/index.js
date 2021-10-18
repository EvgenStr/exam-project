import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Buttons from './Buttons';
import CONSTANTS from '../../../../../constants';
import styles from './OfferItem.module.sass';

function OfferItem ({ offer }) {
  return (
    <article className={styles.offerContainer}>
      <div className={styles.offerInfo}>
        <div className={styles.userInfo}>
          <p>
            Status:{' '}
            <span className={cx(styles[offer.status], styles.status)}>
              {offer.status}
            </span>
          </p>
          <p>{offer.User.displayName}</p>
          <p>{offer.User.email}</p>
        </div>
        <div className={styles.contestInfo}>
          <p>Contest:</p>
          <p>{offer.Contest.status}</p>
          <p>{offer.Contest.title}</p>
          <p>{offer.Contest.focusOfWork}</p>
        </div>
        <div className={styles.offer}>
          <p>Offer:</p>
          {offer.text && <p className={styles.offerText}>{offer.text}</p>}
          {offer.fileName && (
            <a
              href={`${CONSTANTS.publicURL}${offer.fileName}`}
              target='_blank'
              rel='noreferrer'
            >
              <img
                className={styles.offerImage}
                src={`${CONSTANTS.publicURL}${offer.fileName}`}
                alt='offer'
              ></img>
            </a>
          )}
        </div>
      </div>
      <Buttons id={offer.id} status={offer.status} />
    </article>
  );
}
OfferItem.propTypes = {
  offer: PropTypes.object.isRequired,
};
export default OfferItem;
