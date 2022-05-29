import { useState } from 'react';
import styles from './SearchForm.module.css';
import { ReactComponent as SearchIcon } from '../icons/search.svg';
import PropTypes from 'prop-types';

export default function SearchForm({ onSubmit }) {
    const [qwery, setQwery] = useState("");

    const handleSubmit = evt => {
        evt.preventDefault();
        if (qwery.trim() === "") {
            alert("PLEASE ENTER QWERY!")
            return;
        }
        onSubmit(qwery);
        setQwery("");
    }

    const handleInputChange = evt => {
        setQwery(evt.currentTarget.value);
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
                <button type="submit" className={styles.form_button} area-label="Search">
                    <SearchIcon width="48" height="48" fill="black"/>
                </button>

                <input
                    className={styles.form_input}
                    type="text"
                    name="qwery"
                    value={qwery}
                    placeholder="Search images and photos"
                    onChange={handleInputChange}
                />
            </form>
    );
};

SearchForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}
