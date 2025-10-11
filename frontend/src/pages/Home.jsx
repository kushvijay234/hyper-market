import React from 'react'
import HeroSection from '../components/HeroSection'
import FeatureSection from '../components/FeatureSection'
import CategoriesSection from '../components/CategoriesSection'
import FeatureProduct from '../components/FeatureProduct'

const Home = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeatureSection />
      <CategoriesSection />
      <FeatureProduct />
    </div>
  )
}

export default Home
