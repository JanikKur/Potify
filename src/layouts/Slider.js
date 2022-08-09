import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import PodcastItem from '../components/PodcastItem';
import '../assets/styles/layouts/slider.css';

export default function Slider() {
  return (
    <Carousel showArrows={false} showIndicators={false} showThumbs={false} showStatus={false} autoPlay={false}>
          <div className="page">
            <PodcastItem />
            <PodcastItem />
          </div>
          <div className="page">
            <PodcastItem />
            <PodcastItem />
          </div>
    </Carousel>
  )
}
