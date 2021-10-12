import React from 'react';
import Header from '../../components/Header/Header';
import Banner from '../../components/HowItWorks/Banner';
import ServicesSection from '../../components/HowItWorks/ServicesSection';
import styles from './HowItWorksPage.module.sass';

function HowItWorksPage () {
  return (
    <>
      <Header />
      <main>
        <Banner />
        <ServicesSection />
      </main>
    </>
  );
}

export default HowItWorksPage;
