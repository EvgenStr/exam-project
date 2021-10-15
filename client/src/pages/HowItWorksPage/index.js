import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Banner from '../../components/HowItWorks/Banner';
import ServicesSection from '../../components/HowItWorks/ServicesSection';
import FeaturesSection from '../../components/HowItWorks/FeaturesSection';
import FAQTopics from '../../components/HowItWorks/FAQTopics';
import CTASection from '../../components/HowItWorks/CTASection';
import StatsSection from '../../components/HowItWorks/StatsSection';
import ClientsSection from '../../components/HowItWorks/ClientsSection';
import ScrollToTop from '../../components/HowItWorks/ScrollToTop';
import styles from './HowItWorksPage.module.sass';

function HowItWorksPage () {
  const [isShow, setIsShow] = useState(false);
  const scrollHandler = () => {
    const positionY =
      document.body.scrollTop || document.documentElement.scrollTop;
    positionY > 400 ? setIsShow(true) : setIsShow(false);
  };
  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);
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
        {isShow && <ScrollToTop />}
        <Footer />
      </main>
    </>
  );
}

export default HowItWorksPage;
