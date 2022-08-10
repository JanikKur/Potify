import React, { useEffect, useState } from 'react'
import { Carousel } from 'react-responsive-carousel';
import PodcastItem from '../components/PodcastItem';
import '../assets/styles/layouts/slider.css';
import {getAllPodcasts} from '../services/podcast';

export default function Slider() {

  const [podcasts, setPodcasts] = useState();

  useEffect(() => {
    getAllPodcasts().then(res => {
      setPodcasts(res.data.podcasts);
    });
  }, [])

  if(!podcasts) return null;
  return (
    <Carousel showArrows={false} showIndicators={false} showThumbs={false} showStatus={false} autoPlay={false}>
          {podcasts.map((podcast, idx) => <div className="page" key={podcast._id}><PodcastItem data={podcast} /></div>)}
    </Carousel>
  )
}
