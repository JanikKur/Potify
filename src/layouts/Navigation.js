import React, { useRef, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import {AiOutlineSearch, AiOutlineMenu} from 'react-icons/ai';
import '../assets/styles/layouts/navigation.css';
import UserIcon from '../components/UserIcon';
import {useUser} from '../contexts/UserContext';

export default function Navigation() {

    const [showMenu, setShowMenu] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const searchRef = useRef();
    const {currentUser, logout} = useUser();

    const navigate = useNavigate();

    function submit(e){
        e.preventDefault();
        setShowSearch(false);
        navigate(`/search?q=${searchRef.current.value}`);
    }

    return (
        <nav className="navigation">
            <div className="left">
                <button className="menu-button" onClick={() => setShowMenu(!showMenu)}><AiOutlineMenu/></button>
                <Link to="/" className="logo-link">Potify</Link>
            </div>
            <div onClick={() => setShowMenu(false)} className={`nav-links ${!showMenu ? 'collapse' : ''}`}>
                <Link to="/search" className="nav-link">Podcasts</Link>
                {currentUser && <Link to="/favorites" className="nav-link">Favorites</Link>}
                {currentUser && <Link to="/mypodcasts" className="nav-link">My Podcasts</Link>}
                {currentUser && <Link to="/addpodcast" className="nav-link">Add Podcast</Link>}
                {currentUser && <button className="logout-button" onClick={logout}>Logout</button>}
            </div>
            <div className="right">
                    <div className="navigation-search">
                        <form className={`navigation-search-form ${showSearch ? 'show' : ''}`} onSubmit={submit}>
                            <input type="text" className='navigation-search-input' ref={searchRef} />
                        </form>
                        <button className="search-button" onClick={() => {setShowSearch(!showSearch); searchRef.current.focus()}}><AiOutlineSearch/></button>
                    </div>
                    {currentUser ? <UserIcon name={currentUser.username[0].toUpperCase()} /> : <div><Link to="/login" className="nav-link">Log In</Link>/<Link to="/register" className="nav-link">Sign Up</Link></div>}
            </div>
        </nav>
    )
}
