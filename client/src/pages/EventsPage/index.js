import React from 'react';
import Events from '../../components/Events';
import Header from '../../components/Header/Header';
import styles from './EventsPage.module.sass';

function EventsPage () {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <Events />
      </div>
    </>
  );
}
export default EventsPage;
