import React from 'react';
import cx from 'classnames';
import styles from './NavItem.module.sass';

function NavItem ({ href, caption }) {
  return (
    <li>
      <a
        className={cx(
          styles.navLink,
          'list-group-item list-group-item-action py-3 px-0 active',
        )}
        href={href}
      >
        {caption}
      </a>
    </li>
  );
}

export default NavItem;
