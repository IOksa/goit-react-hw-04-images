import React, { useState } from 'react';
import css from './Searchbar.module.css';
import sprite from '../../icons/sprite.svg';

const Searchbar=({onSubmit})=>{
    const [query, setQuery]=useState('');
  
    const handleChange = e => {
        setQuery(e.currentTarget.value);
    };

    const handleSubmit = e => {
        e.preventDefault();
       
        onSubmit(query);
        setQuery('');
       
    };


    return(
        <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchFormButton} >
            <svg width="20" height="20">
            <use href={sprite}></use>
            </svg>
        </button>
    
        <input
            className={css.SearchFormInput}
            type="text"
            name="query"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={query}
            onChange={handleChange}
        />
        </form>
        </header>
    );

}

export default Searchbar;

