import styles from './ImageGallery.module.css';
import { useState, useEffect } from 'react';
import ImageGalleryItem from '../imageGalleryItem/ImageGalleryItem.jsx';
import Button from '../button/Button.jsx';
import Loader from '../loader/Loader.jsx';
import Modal from '../modal/Modal.jsx';
import StartSearch from '../startSearch/StartSearch.jsx';
import { apiService } from '../apiService/apiService.js';
import PropTypes from 'prop-types';

export default function ImageGallery({ qwery }) {
    const [showModal, setShowModal] = useState(false);
    const [page, setPage] = useState(1);
    const [images, setImages] = useState([]);
    const [largeImg, setLargeImg] = useState("");
    const [tags, setTags] = useState("");
    const [totalImg, setTotalImg] = useState(0);
    const [status, setStatus] = useState("start");
    const [oldQwery, setOldQwery] = useState("");

    useEffect(() => {
        if (qwery === "") {
            return;
        }

        setStatus("pending");

        try {
            if (qwery === oldQwery && page !== 1) {
                apiService(oldQwery, page).then(dataObject => {
                    setImages(pervState => [...pervState, ...dataObject.data.hits]);
                    setTotalImg(dataObject.data.totalHits);
                    setStatus("resolve");
                })
            } else {
                const startPage = 1;
                apiService(qwery, startPage).then(dataObject => {
                    if (dataObject.data.hits.length !== 0) {
                        setImages(dataObject.data.hits);
                        setTotalImg(dataObject.data.totalHits);
                        setStatus("resolve");
                    } else {
                        setStatus("noneQwery")
                    };
                })
                setOldQwery(qwery);
                setPage(1);
            }
        } catch (error) {
            console.log(error);
            setStatus("error");
        }
    }, [qwery, oldQwery, page]); 

    const onLoadMoreClick = () => {
        setStatus("pending");
        setPage(prevState => (prevState + 1));
    }

    const toggleModal = () => {
        setShowModal(prevState =>(!prevState));
    };

    const onImgClick = (imgURL, tags) => {
        setLargeImg(imgURL);
        setTags(tags);
        toggleModal();
    }

    if (status === "start") {
        return (
            <>
                <StartSearch />
            </>
        )
    }

    if (status === "pending") {
        return (
            <main className={styles.main_loader}>
                <div className={styles.loader_position}>
                    <Loader />
                </div>
            </main>
        );
    }

    if (status === "error") {
        return (<main>
            <p className={styles.message}>ERROR!</p>
        </main>)
    }

    if (status === "noneQwery") {
        return (<main>
            <p className={styles.message}>Sorry, there is no such query.</p>
        </main>)
    }

    if (status === "resolve") {
        return (
            <main className={styles.container}>
                <ul className={styles.gallery}>
                    {images.map(img => {
                        return <ImageGalleryItem
                            onClickItem={onImgClick}
                            key={img.id}
                            data={img}
                        />
                    })}
                </ul>
                {showModal && <Modal onClickClose={toggleModal} largeImg={largeImg} tags={tags} />}
                {((images.length !== 0) && (page !== Math.ceil(totalImg / 12))) && <Button onLoadClick={onLoadMoreClick} />}
            </main>
        )
    }
}

ImageGallery.propTypes = {
    qwery: PropTypes.string.isRequired,
}
