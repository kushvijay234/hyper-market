import React from 'react'
import HeroSection from '../components/HeroSection'
import FeatureSection from '../components/FeatureSection'
import CategoriesSection from '../components/CategoriesSection'
import FeatureProduct from '../components/FeatureProduct'

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <HeroSection className="mb-12 pt-26" />
      <FeatureSection className="mb-12" />
      <CategoriesSection className="mb-12" />
      <FeatureProduct className="mb-12" />
    </div>
  )
}

export default Home
