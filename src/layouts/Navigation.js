import React, { useState } from 'react'
import { Link } from "react-router-dom";
import {AiOutlineSearch, AiOutlineMenu} from 'react-icons/ai';
import '../assets/styles/layouts/navigation.css';

export default function Navigation() {

    const [showMenu, setShowMenu] = useState(false);

    return (
        <nav className="navigation">
            <div className="left">
                <button className="menu-button" onClick={() => setShowMenu(!showMenu)}><AiOutlineMenu/></button>
                <Link to="/" className="logo-link">Potify</Link>
            </div>
            <div onClick={() => setShowMenu(false)} className={`nav-links ${!showMenu ? 'collapse' : ''}`}>
                <Link to="/search" className="nav-link">Podcasts</Link>
                <Link to="/" className="nav-link">Favorites</Link>
                <Link to="/" className="nav-link">Potify</Link>
            </div>
            <div className="right">
                    <button className="search-button"><AiOutlineSearch/></button>
                    <Link to="/settings" className="user-icon">J</Link>
            </div>
        </nav>
    )
}
