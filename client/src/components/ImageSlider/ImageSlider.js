import React from 'react';
import './ImageSlider.styles.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import ImageSliderWrapper from '../ImageSliderWrapper/ImageSliderWrapper';
import { useSelector } from 'react-redux';

const ImageSlider = () => {
  const settings = {
    dots: true,
    draggable: false,
    infinite: true,
    arrows: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000,
  };

  const popularMovies = useSelector(state => state?.movies?.popularMovies?.filter((movie, i) => i <= 7));

  return (
    <Slider {...settings} className='image-slider-container'>
      {popularMovies?.map(movie => <ImageSliderWrapper key={movie.id} movie={movie} />)}
      
      {/* <div className='image-wrapper'>
        <img className='image-slider-image encanto' src='images/slider-encanto-banner.jpg' />
      </div>

      <div className='image-wrapper'>
        <img className='image-slider-image raya' src='images/slider-raya-banner.jpg' />
      </div>

      <div className='image-wrapper'>
        <img className='image-slider-image onward' src='images/slider-badag.jpg' />
      </div>

      <div className='image-wrapper'>
        <img className='image-slider-image luca' src='images/slider-luca-banner.jpeg' />
      </div>

      <div className='image-wrapper'>
        <img className='image-slider-image burrow' src='images/slider-badging.jpg' />
      </div>

      <div className='image-wrapper'>
        <img className='image-slider-image wandavision' src='images/slider-scale.jpg' />
      </div> */}

    </Slider>
  )
}

export default ImageSlider;