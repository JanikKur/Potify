import React from 'react'
import '../assets/styles/components/podcastItem.css';
import { Link } from "react-router-dom";

export default function PodcastItem({data}) {
  return (
    <Link to={`/podcast?id=${data?._id}`} className="podcast-item">
      <img src={`${data?.fileLinks[0]}`} alt="Test" className="podcast-image"/>
      <label>{data?.title}</label>
    </Link>
  )
}
