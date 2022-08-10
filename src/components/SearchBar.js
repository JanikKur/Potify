import React, { useRef } from 'react'
import {AiOutlineSearch} from 'react-icons/ai';
import '../assets/styles/components/searchBar.css';

export default function SearchBar({ title, onSubmit }) {

    const titleRef = useRef();

    return (
        <form onSubmit={e => {e.preventDefault(); onSubmit(titleRef.current.value)}} className='search-bar'>
            <button type="submit" className="submit-button"><AiOutlineSearch/></button>
            <input type="text" defaultValue={title} ref={titleRef} placeholder="Search for Podcasts..." className="search-input"/>
        </form>
    )
}
