import React from 'react';
import Header from '../../components/Header/Header';
import Banner from '../../components/HowItWorks/Banner';
import ServicesSection from '../../components/HowItWorks/ServicesSection';
import FeaturesSection from '../../components/HowItWorks/FeaturesSection';
import FAQTopics from '../../components/HowItWorks/FAQTopics';
import CTASection from '../../components/HowItWorks/CTASection';
import styles from './HowItWorksPage.module.sass';

function HowItWorksPage () {
  return (
    <>
      <Header />
      <main className={styles.mainContainer}>
        <Banner />
        <ServicesSection />
        <FeaturesSection />
        <hr className={'my-0'} />
        <FAQTopics />
        <CTASection />
      </main>
    </>
  );
}

export default HowItWorksPage;
