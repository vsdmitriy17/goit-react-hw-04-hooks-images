import { useState } from 'react';
import ImageGallery from './imageGallery/ImageGallery.jsx';
import Searchbar from './searchbar/Searchbar.jsx';
import SearchForm from './searchForm/SearchForm.jsx';

export default function App() {
    const [qwery, setQwery] = useState("");

    return (
        <>
            <Searchbar>
                <SearchForm onSubmit={setQwery} />
            </Searchbar>
            <ImageGallery qwery={qwery} />
        </>
    );
};
