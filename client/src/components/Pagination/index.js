import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.sass';

function Pagination (props) {
  console.log(`Pagination`);
  return (
    <div className={styles.paginationContainer}>
      <ReactPaginate
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        onPageActive={null}
        containerClassName={styles.pagination}
        activeClassName={styles.active}
        disabledClassName={styles.disabled}
        disableInitialCallback={true}
        {...props}
      />
    </div>
  );
}
export default Pagination;
