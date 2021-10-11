import React from 'react';
import Header from '../../components/Header/Header';
import styles from './HowItWorksPage.module.sass'

function HowItWorksPage () {
  return (
    <>
      <Header />
      <main>
        <section className={styles.banner}></section>
      </main>
    </>
  );
}

export default HowItWorksPage;
