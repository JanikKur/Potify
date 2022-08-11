import React, { useState } from 'react'
import { Link } from "react-router-dom";
import {AiOutlineSearch, AiOutlineMenu} from 'react-icons/ai';
import '../assets/styles/layouts/navigation.css';
import UserIcon from '../components/UserIcon';
import {useUser} from '../contexts/UserContext';

export default function Navigation() {

    const [showMenu, setShowMenu] = useState(false);
    const {currentUser} = useUser();

    return (
        <nav className="navigation">
            <div className="left">
                <button className="menu-button" onClick={() => setShowMenu(!showMenu)}><AiOutlineMenu/></button>
                <Link to="/" className="logo-link">Potify</Link>
            </div>
            <div onClick={() => setShowMenu(false)} className={`nav-links ${!showMenu ? 'collapse' : ''}`}>
                <Link to="/search" className="nav-link">Podcasts</Link>
                <Link to="/favorites" className="nav-link">Favorites</Link>
                <Link to="/mypodcasts" className="nav-link">My Podcasts</Link>
                <Link to="/addpodcast" className="nav-link">Add Podcast</Link>
            </div>
            <div className="right">
                    <button className="search-button"><AiOutlineSearch/></button>
                    {currentUser ? <UserIcon name='J' /> : <div><Link to="/login" className="nav-link">Log In</Link>/<Link to="/register" className="nav-link">Sign Up</Link></div>}
            </div>
        </nav>
    )
}
