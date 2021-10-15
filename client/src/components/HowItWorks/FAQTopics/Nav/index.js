import React from 'react';
import cx from 'classnames';
import NavItem from './NavItem';
import navData from './navData.json';
import styles from './Nav.module.sass';

function Nav () {
  const navItems = navData.map((item, i) => <NavItem key={i} {...item} />);
  return (
    <nav className={cx(styles.stickyNav, 'card border-0 bg-primary')}>
      <ul className='list-group py-3 px-4'>{navItems}</ul>
    </nav>
  );
}

export default Nav;
