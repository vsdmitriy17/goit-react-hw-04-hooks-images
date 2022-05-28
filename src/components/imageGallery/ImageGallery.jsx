import styles from './ImageGallery.module.css';
import React, { Component } from 'react';
import ImageGalleryItem from '../imageGalleryItem/ImageGalleryItem.jsx';
import Button from '../button/Button.jsx';
import Loader from '../loader/Loader.jsx';
import Modal from '../modal/Modal.jsx';
import StartSearch from '../startSearch/StartSearch.jsx';
import { apiService } from '../apiService/apiService.js';
import PropTypes from 'prop-types';

export default class ImageGallery extends Component {
    state = {
        showModal: false,
        page: 1,
        images: [],
        largeImg: "",
        tags: "",
        totalImg: 0,
        status: "start"
    }

    async componentDidUpdate(prevProps, prevState) {
        try {
            if (prevProps.qwery !== this.props.qwery) {
                this.setState({
                    showModal: false,
                    page: this.props.startPage,
                    images: [],
                    largeImg: "",
                    tags: "",
                    totalImg: 0,
                    status: "pending"
                });

                const dataObject = await apiService(this.props.qwery, this.props.startPage);

                (dataObject.data.hits.length !== 0) ? this.setState({
                    images: dataObject.data.hits,
                    totalImg: dataObject.data.totalHits,
                    status: "resolve"
                }) : this.setState({
                    status: "noneQwery"
                })
            } else if ((prevState.page !== this.state.page) && (this.state.page !== 1)) {
                const dataObject = await apiService(this.props.qwery, this.state.page);

                this.setState(prevState => ({
                    images: [...prevState.images, ...dataObject.data.hits],
                    totalImg: dataObject.data.totalHits,
                    status: "resolve"
                }))
            }
        } catch (error) {
            this.setState({
                status: "error"
            });
        }
    }

    onLoadMoreClick = () => {
        this.setState(prevState => ({
            page: prevState.page + 1,
            status: "pending"
        }));
    }

    toggleModal = () => {
        this.setState(prevState =>
            ({ showModal: !prevState.showModal }));
    };

    onImgClick = (imgURL, tags) => {
        this.setState({
            largeImg: imgURL,
            tags: tags
        });
        this.toggleModal();
    }

    render() {
        if (this.state.status === "start") {
            return (
                <>
                    <StartSearch />
                </>
            )
        }

        if (this.state.status === "pending") {
            return (
                <main className={styles.main_loader}>
                    <div className={styles.loader_position}>
                        <Loader />
                    </div>
                </main>
            );
        }

        if (this.state.status === "error") {
            return (<main>
                <p className={styles.message}>ERROR!</p>
            </main>)
        }

        if (this.state.status === "noneQwery") {
            return (<main>
                <p className={styles.message}>Sorry, there is no such query.</p>
            </main>)
        }

        if (this.state.status === "resolve") {
            return (
                <main className={styles.container}>
                    <ul className={styles.gallery}>
                        {this.state.images.map(img => {
                            return <ImageGalleryItem
                                onClickItem={this.onImgClick}
                                key={img.id}
                                data={img}
                            />
                        })}
                    </ul>
                    {this.state.showModal && <Modal onClickClose={this.toggleModal} largeImg={this.state.largeImg} tags={this.state.tags} />}
                    {((this.state.images.length !== 0) && (this.state.page !== Math.ceil(this.state.totalImg/12))) && <Button onLoadClick={this.onLoadMoreClick} />}
                </main>
            )
        }
    }
};

ImageGallery.propTypes = {
    qwery: PropTypes.string.isRequired,
    startPage: PropTypes.number.isRequired,
}
