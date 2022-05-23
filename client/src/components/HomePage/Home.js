import React from 'react';
import './Home.styles.scss';
import ImageSlider from '../ImageSlider/ImageSlider';
import Viewers from '../Viewers/Viewers';
import Movies from '../Movies/Movies';

const Home = () => {
  
  return (
    <main className='home-container'>
      <ImageSlider />
      <Viewers />
      <Movies />
    </main>
  )
}

export default Home;