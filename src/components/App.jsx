import { useState, useEffect, useRef } from 'react';
import * as API from 'services/api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from './Button/Button';
import {queryLimit} from '../constants/constants';


export const App = () =>{
  const [query, setQuery]=useState('');
  const [gallery, setGallery]=useState([]);
  const [countPage, setCountPage]=useState(1);
  const [isLoading, setIsLoading]=useState(false);
  const [isLoadButton, setIsLoadButton]=useState(true);

  const elemRef = useRef(null);

  useEffect(() => {
    if (!query) {
      return;
    }

    const fetchImages = () => {
      setIsLoading(true);
     
      API.getFetchQueryImageGallery(query, countPage)
      .then(images=>{
        if (images.length===0){
          toast.error('Sorry, there are no images matching your search query. Please try again.');
        }
        else{
          countPage===1
          ? setGallery([...images.hits])
          : setGallery(prevState => [...prevState, ...images.hits]);
    
        }
        if(countPage>1){
          console.log("Я ЗДЕСЬ!!!!");
          const { top } = elemRef.current.getBoundingClientRect();
          window.scrollTo({ top, behavior: 'smooth' });
          
        }
          
        if(countPage>images.totalHits/queryLimit){
          setIsLoadButton(false);
          toast.info("We're sorry, but you've reached the end of search results.");
        }
      
      })
      .catch(error=>{
        const errorMessage="Ой! Что-то пошло не так :( Перезагрузите страницу и попробуйте еще раз."+error.toString();
        toast.error(errorMessage);
      })
      .finally(()=>setIsLoading(false));
    };

    fetchImages();
    
  }, [countPage, query]);



  const onChangeQuery = searchQuery => {
    if(searchQuery===''){
      toast.error('Empty search input');
      return;
    }

    setQuery(searchQuery);
    setCountPage(1);
    //setGallery([]);если запрос дублируется и страница 1, то второй раз не рендерится разметка, если gallery[];

  };
   
  const handleOnClickLoadMore =()=>{
    setCountPage(prevState => (prevState + 1));
  }

  const shouldRenderImageGallery=gallery.length!==0 && !isLoading;
  const shouldRenderLoadButton=gallery.length!==0 && !isLoading && isLoadButton;

  return(
    <>
    <ToastContainer autoClose="3000" theme="colored"/>
    <Searchbar onSubmit={onChangeQuery}/>
    {isLoading && <Loader/>}
    {shouldRenderImageGallery && <ImageGallery gallery={gallery} ref={elemRef}/>}
    {shouldRenderLoadButton && <Button onClickLoadMore={handleOnClickLoadMore}/>}
    
    </>
  );
  
}

