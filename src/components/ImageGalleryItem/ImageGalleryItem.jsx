import { useState } from 'react';
import Modal from '../Modal/Modal';
import BigImageInModal from '../BigImageInModal/BigImageInModal';
import css from './ImageGalleryItem.module.css';


const ImageGalleryItem =({image:{webformatURL,tags,largeImageURL}})=>{ 
  const [isModalOpen, setIsModalOpen]=useState(false);

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
      <li className={css.ImageGalleryItem} onClick={onOpenModal} >
        <img src={webformatURL} alt={tags} loading="lazy" className={css.ImageGalleryItemImage} />
      </li>
      
      {isModalOpen && (
      <Modal onCloseModal={onCloseModal}>
        <BigImageInModal largeImageURL={largeImageURL} tags={tags} />
      </Modal>
      )}
    </>
    
  );

};

 
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




