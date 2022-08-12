import React from 'react'
import PodcastItem from './PodcastItem';
import '../assets/styles/components/slider.css';
import Slider from "react-slick";
import '../../node_modules/slick-carousel/slick/slick.css';
import '../../node_modules/slick-carousel/slick/slick-theme.css';


export default function PodcastSlider({podcasts}) {

  const settings = {
    dots: false,
    infinite: false,
    arrows: false,
    centerPadding: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2
  };

  if (!podcasts) return  'No Podcasts';
  return (
    <Slider {...settings}>
      {podcasts.map((podcast, idx) =><PodcastItem key={podcast._id} data={podcast} />)}
    </Slider>
  )
}
