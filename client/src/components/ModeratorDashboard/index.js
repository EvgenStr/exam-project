import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { moderationActionGetOffers } from '../../actions/actionCreator';
import OffersList from './OffersList';
import Pagination from '../Pagination';
import Spinner from '../Spinner/Spinner';
import styles from './ModeratorDashboard.module.sass';
import CONSTANTS from '../../constants';
const limit = CONSTANTS.OFFERS_PER_PAGE;

function ModeratorDashboard () {
  const { offers, count, isFetching, errors } = useSelector(
    state => state.moderationOffers,
  );
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const pageCount = Math.ceil(count / limit);
  const onPageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  useEffect(() => {
    dispatch(moderationActionGetOffers({ limit, offset: currentPage * limit }));
  }, []);
  useEffect(() => {
    dispatch(moderationActionGetOffers({ limit, offset: currentPage * limit }));
  }, [currentPage, dispatch]);

  return (
    <div className={styles.dashboardContainer}>
      {isFetching && <Spinner />}
      {!isFetching && errors && (
        <span className={styles.errorContainer}>{errors}</span>
      )}
      {!isFetching && <OffersList />}
      {!isFetching && offers.length === 0 && <span>No offers</span>}
      {!isFetching && !errors && pageCount > 1 && (
        <Pagination
          pageCount={pageCount}
          onPageChange={onPageChange}
          initialPage={currentPage}
        />
      )}
    </div>
  );
}
export default ModeratorDashboard;
