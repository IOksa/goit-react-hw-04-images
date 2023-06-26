import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import {useRef, useState, useEffect} from 'react';


const ImageGallery=({gallery, ref})=>{
    const [height] = useState(0);
    const ulRef = useRef(null);

    useEffect(() => {
        if (ulRef.current) {
            const ulHeight = ulRef.current.clientHeight;
            //const viewportHeight = window.innerHeight;
            //const scrollToValue = ulHeight - viewportHeight;
            const { height: cardHeight } = ulRef.current.firstElementChild.getBoundingClientRect();
            const scrollToValue = ulHeight - cardHeight*4;
            window.scrollTo({ top: scrollToValue, behavior: 'smooth' });
        
        }
    }, [height]);

    return(
        <ul className={css.ImageGallery} ref={ulRef}>
            {gallery.map(image => (
                <ImageGalleryItem key={image.id} image={image} />
            ))}
        </ul>
    );
};

export default ImageGallery;


ImageGallery.propTypes={
    gallery: PropTypes.array.isRequired,

}; 