import React from 'react'
import '../assets/styles/components/podcastItem.css';
import { Link } from "react-router-dom";

export default function PodcastItem({data}) {
  return (
    <Link to={`/podcast?id=${data?._id}`} className="podcast-item">
      <img src={`${process.env.REACT_APP_BACKEND_URL}${data?.fileLinks[0]}`} alt={data.title} className="podcast-image"/>
      <label>{data?.title}</label>
    </Link>
  )
}
