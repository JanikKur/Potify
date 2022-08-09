import React from 'react'
import '../assets/styles/components/podcastItem.css';
import TestImage from '../assets/images/index.png';
import { Link } from "react-router-dom";

export default function PodcastItem() {
  return (
    <Link to="/podcast" className="podcast-item">
      <img src={TestImage} alt="Test" className="podcast-image"/>
      <label>Der Podcast</label>
    </Link>
  )
}
