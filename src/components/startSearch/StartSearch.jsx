import styles from './StartSearch.module.css';
import React from 'react';
import startImg from '../img/bgImage_1600.jpg';

export default function StartSearch() {
    return (
        <main className={styles.start}>
            <h1 className={styles.startTitle}>LIFES COLORS</h1>
            <img
                className={styles.startImage}
                src={startImg}
                alt="startImage"
            />
        </main >
    );
};
