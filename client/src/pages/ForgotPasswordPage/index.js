import React from 'react';
import { Link } from 'react-router-dom';
import ForgotPasswordForm from '../../components/ForgotPasswordForm';
import Logo from '../../components/Logo';
import styles from './ForgotPasswordPage.module.sass';
import CONSTANTS from '../../constants';

const ForgotPasswordPage = () => (
  <div className={styles.mainContainer}>
    <div className={styles.passwordContainer}>
      <div className={styles.header}>
        <Logo src={`${CONSTANTS.STATIC_IMAGES_PATH}logo.png`} alt='logo' />
        <div className={styles.linkContainer}>
          <Link to='/registration' style={{ textDecoration: 'none' }}>
            <span>Signup</span>
          </Link>
          <Link to='/login' style={{ textDecoration: 'none' }}>
            <span>Login</span>
          </Link>
        </div>
      </div>
      <div className={styles.passwordFormContainer}>
        <ForgotPasswordForm />
      </div>
    </div>
  </div>
);
export default ForgotPasswordPage;
