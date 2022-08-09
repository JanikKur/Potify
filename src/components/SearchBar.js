import React from 'react'
import {AiOutlineSearch} from 'react-icons/ai';
import '../assets/styles/components/searchBar.css';

export default function SearchBar({ onSubmit }) {


    return (
        <form onSubmit={onSubmit} className='search-bar'>
            <button type="submit" className="submit-button"><AiOutlineSearch/></button>
            <input type="text" placeholder="Search for Podcasts..." className="search-input"/>
        </form>
    )
}
