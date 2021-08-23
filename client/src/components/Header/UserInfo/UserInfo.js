import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import CONSTANTS from '../../../constants';
import { clearUserStore } from '../../../actions/actionCreator';
import styles from './UserInfo.module.sass';

function UserInfo (props) {
  const logOut = () => {
    localStorage.clear();
    props.clearUserStore();
    props.history.replace('/login');
  };
  return (
    <>
      <div className={styles.userInfo}>
        <img
          src={
            props.data.avatar
              ? `${CONSTANTS.publicURL}${props.data.avatar}`
              : CONSTANTS.ANONYM_IMAGE_PATH
          }
          alt='user'
        />
        <span>{`Hi, ${props.data.displayName}`}</span>
        <img src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`} alt='menu' />
        <ul>
          <li>
            <Link to='/dashboard' style={{ textDecoration: 'none' }}>
              <span>View Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to='/account' style={{ textDecoration: 'none' }}>
              <span>My Account</span>
            </Link>
          </li>
          <li>
            <Link to='http:/www.google.com' style={{ textDecoration: 'none' }}>
              <span>Messages</span>
            </Link>
          </li>
          <li>
            <Link to='http:/www.google.com' style={{ textDecoration: 'none' }}>
              <span>Affiliate Dashboard</span>
            </Link>
          </li>
          <li>
            <span onClick={logOut}>Logout</span>
          </li>
        </ul>
      </div>
      <img
        src={`${CONSTANTS.STATIC_IMAGES_PATH}email.png`}
        className={styles.emailIcon}
        alt='email'
      />
    </>
  );
}

const mapStateToProps = state => state.auth;
const mapDispatchToProps = dispatch => ({
  clearUserStore: () => dispatch(clearUserStore()),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserInfo),
);