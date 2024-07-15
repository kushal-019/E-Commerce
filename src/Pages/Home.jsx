import React from 'react';
import Layout from '../Components/Layout';
import HeroSection from '../Components/HeroSection';
import Category from '../Components/Category';
import HomePageProductCard from '../Components/HomePageProductCard';
import Track from '../Components/Track';
import Testimonial from '../Components/Testimonial';
import Loader from '../Components/Loader';

export default function Home() {
  return (
    <Layout>
      <HeroSection/>
      <Category/>
      <HomePageProductCard/>
      <Track/>
      <Testimonial/>
    </Layout>
  )
}
 