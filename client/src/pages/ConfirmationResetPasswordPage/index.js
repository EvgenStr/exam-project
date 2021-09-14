import React from 'react';
import { Link } from 'react-router-dom';
import ConfirmResetPassword from '../../components/ConfirmResetPassword';
import Logo from '../../components/Logo';
import CONSTANTS from '../../constants';
import styles from './ConfirmationResetPasswordPage.module.sass';

function ConfirmationResetPasswordPage () {
  return (
    <div className={styles.container}>
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
          <ConfirmResetPassword />
        </div>
      </div>
    </div>
  );
}
export default ConfirmationResetPasswordPage;
