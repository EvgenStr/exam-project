import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Banner from '../../components/HowItWorks/Banner';
import ServicesSection from '../../components/HowItWorks/ServicesSection';
import FeaturesSection from '../../components/HowItWorks/FeaturesSection';
import FAQTopics from '../../components/HowItWorks/FAQTopics';
import CTASection from '../../components/HowItWorks/CTASection';
import StatsSection from '../../components/HowItWorks/StatsSection';
import ClientsSection from '../../components/HowItWorks/ClientsSection';
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
        <StatsSection />
        <ClientsSection />
        <Footer />
      </main>
    </>
  );
}

export default HowItWorksPage;
