import React from 'react'
import '../assets/styles/components/mainLink.css';
import { Link } from "react-router-dom";

export default function MainLink({icon, text, href}) {
  return (
    <Link to={href} className="main-link">
        <div className="icon-wrapper">
        {icon}
        </div>
        <label>{text}</label>
    </Link>
  )
}
