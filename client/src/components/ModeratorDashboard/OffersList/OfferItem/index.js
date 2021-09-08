import React from 'react';
import cx from 'classnames';
import Buttons from './Buttons';
import CONSTANTS from '../../../../constants';
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
        <div className={styles.offerInfo}>
          {offer.text && <span className={styles.offerText}>{offer.text}</span>}
          {offer.fileName && (
            <a
              href={`${CONSTANTS.publicURL}${offer.fileName}`}
              target='_blank'
              rel='noreferrer'
            >
              <img className={styles.offerImage}
                src={`${CONSTANTS.publicURL}${offer.fileName}`}
                alt='offer'
              ></img>
            </a>
          )}
        </div>
      </div>
      <Buttons id={offer.id} />
    </article>
  );
}
export default OfferItem;
