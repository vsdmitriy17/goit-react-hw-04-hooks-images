import React, { Component } from 'react';
import styles from './SearchForm.module.css';
import { ReactComponent as SearchIcon } from '../icons/search.svg';
import PropTypes from 'prop-types';

class SearchForm extends Component {
    state = {
        qwery: '',
    }

    handleSubmit = evt => {
        evt.preventDefault();
        if (this.state.qwery.trim() === "") {
            alert("PLEASE ENTER QWERY!")
            return;
        }
        this.props.onSubmit(this.state);
        this.resetForm();
    }

    handleInputChange = evt => {
        this.setState({[evt.currentTarget.name]: evt.currentTarget.value});
    }

    resetForm = () => {
        this.setState({
            qwery: '',
        });
    }
    
    render() {
        return (
            <form className={styles.form} onSubmit={this.handleSubmit}>
                    <button type="submit" className={styles.form_button} area-label="Search">
                        <SearchIcon width="48" height="48" fill="black"/>
                    </button>

                    <input
                        className={styles.form_input}
                        type="text"
                        // pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        // title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                        // required
                        name="qwery"
                        value={this.state.qwery}
                        placeholder="Search images and photos"
                        onChange={this.handleInputChange}
                    />
                </form>
        );
    }
};

SearchForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}

export default SearchForm;