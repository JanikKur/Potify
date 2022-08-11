import React, { useEffect, useState } from 'react'
import PodcastItem from '../components/PodcastItem';
import '../assets/styles/layouts/slider.css';
import { getAllPodcasts } from '../services/podcast';
import Slider from "react-slick";
import '../../node_modules/slick-carousel/slick/slick.css';
import '../../node_modules/slick-carousel/slick/slick-theme.css';


export default function PodcastSlider() {

  const [podcasts, setPodcasts] = useState();

  useEffect(() => {
    getAllPodcasts().then(res => {
      setPodcasts(res.data.podcasts);
    });
  }, []);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2
  };

  if (!podcasts) return null;
  return (
    <Slider {...settings}>
      {podcasts.map((podcast, idx) =><PodcastItem key={podcast._id} data={podcast} />)}
    </Slider>
  )
}
