import styles from './Button.module.css';
import PropTypes from 'prop-types';

export default function Button({ onLoadClick }) {
    return (
        <button type="button" className={styles.button} onClick={() => onLoadClick()}>Load more</button>
    );
};

Button.propTypes = {
    onLoadClick: PropTypes.func.isRequired,
}