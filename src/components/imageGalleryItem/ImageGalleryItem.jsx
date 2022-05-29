import styles from './ImageGalleryItem.module.css';
import React from 'react';
import PropTypes from 'prop-types';

export default function ImageGalleryItem({onClickItem, data}) {
    return (
        <li className={styles.gallery_item}>
            <img
                className={styles.gallery_item__image}
                src={data.webformatURL}
                alt={data.tags}
                onClick={() => { onClickItem(data.largeImageURL, data.tags) }}
                id={data.id}
            />
        </li>
    );
};

ImageGalleryItem.propTypes = {
    data: PropTypes.object.isRequired,
    onClickItem: PropTypes.func.isRequired,
}