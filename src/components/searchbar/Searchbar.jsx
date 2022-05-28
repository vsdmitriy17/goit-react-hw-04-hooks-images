import React, { Component } from 'react';
import styles from './Searchbar.module.css';

class Searchbar extends Component {
    render() {
        return (
            <header className={styles.searchbar}>
                {this.props.children}
            </header>
        );
    }
};

export default Searchbar;