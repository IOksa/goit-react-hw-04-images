import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';


const ImageGallery=({gallery, ref})=>(
    <ul className={css.ImageGallery}>
        {gallery.map(image => (
            <ImageGalleryItem key={image.id} image={image} ref={ref}/>
        ))}
    </ul>
);

export default ImageGallery;


ImageGallery.propTypes={
    gallery: PropTypes.array.isRequired,

}; 