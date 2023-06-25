import { useState, forwardRef} from 'react';
import Modal from '../Modal/Modal';
import BigImageInModal from '../BigImageInModal/BigImageInModal';
import css from './ImageGalleryItem.module.css';


const ImageGalleryItem = forwardRef ((props, ref)=>{ 
  const [isModalOpen, setIsModalOpen]=useState(false);

  const {webformatURL,tags,largeImageURL}=props.image;

  const onOpenModal = () => {
    setIsModalOpen(true);
		window.addEventListener('keydown', onEscKeyPress);
	};

  const onCloseModal = () => {
    setIsModalOpen(false);
	  window.removeEventListener('keydown', onEscKeyPress);
 
	};

  const onEscKeyPress=(event)=> {
    const ESC_KEY_CODE = 'Escape';
    const isEscKey = event.code === ESC_KEY_CODE;
    if (isEscKey) {
        onCloseModal();
    }
  };


  return (
    <>
      <li className={css.ImageGalleryItem} onClick={onOpenModal} ref={ref}>
        <img src={webformatURL} alt={tags} loading="lazy" className={css.ImageGalleryItemImage} />
      </li>
      
      {isModalOpen && (
      <Modal onCloseModal={onCloseModal}>
        <BigImageInModal largeImageURL={largeImageURL} tags={tags} />
      </Modal>
      )}
    </>
    
  );

});

 
export default ImageGalleryItem;


  // scrollToBottom = () => {
  //   this.messagesEnd.scrollIntoView({behavior: "smooth" });
  
  // }
  
  // componentDidMount() {
  //   this.scrollToBottom();
  // }
  
  // componentDidUpdate() {
  //   this.scrollToBottom();
  // }
  //ref={(el) => { this.messagesEnd = el; } }




