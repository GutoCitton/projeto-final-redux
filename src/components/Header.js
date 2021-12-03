import React from 'react';
import { Link } from 'react-router-dom';

import Menu from "./Menu"
import styles from './Header.module.css'

const Header = () => {
  return (
    <header className={styles.header}>
        <div className='container'>
          <div className={styles.headerContainer}>
            <Link to="/">Logo</Link>
            <Menu />
          </div>
        </div>
    </header>
  )
}

export default Header
