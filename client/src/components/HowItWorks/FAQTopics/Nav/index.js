import React from 'react';
import NavItem from './NavItem';
import navData from './navData.json';

function Nav () {
  const navItems = navData.map((item, i) => <NavItem key={i} {...item} />);
  return (
    <nav className='card border-0 bg-primary'>
      <ul className='list-group list-group-transparent list-group-white list-group-flush list-group-borderless py-3 px-4'>
        {navItems}
      </ul>
    </nav>
  );
}

export default Nav;
