import React, { Component } from 'react';
import ImageGallery from './imageGallery/ImageGallery.jsx';
import Searchbar from './searchbar/Searchbar.jsx';
import SearchForm from './searchForm/SearchForm.jsx';

class App extends Component {
    state = {
        qwery: "",
        startPage: 1
    }

    formSubmit = data => {
        this.setState({
            qwery: data.qwery
        })
    }

    
    render() {
        return (
            <>
                <Searchbar>
                    <SearchForm onSubmit={this.formSubmit} />
                </Searchbar>
                <ImageGallery qwery={this.state.qwery} startPage={this.state.startPage}/>
            </>
        );
    };
};

export default App;
