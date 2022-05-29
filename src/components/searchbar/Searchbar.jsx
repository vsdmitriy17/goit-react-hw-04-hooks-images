import React from 'react';
import styles from './Searchbar.module.css';

export default function Searchbar({ children }) {
    return (
        <header className={styles.searchbar}>
            {children}
        </header>
    );
};
