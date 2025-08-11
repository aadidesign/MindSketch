import React from 'react'
import Header from '../components/Header.jsx'
import Steps from '../components/Steps.jsx'
import Description from '../components/Description.jsx'
import Testimonials from '../components/Testimonials.jsx'
import GenerateBtn from '../components/GenerateBtn.jsx'
import Footer from '../components/Footer.jsx'

function Home() {
  return (
    <div>
      <Header/>
      <Steps/>
      <Description/>
      <Testimonials/>
      <GenerateBtn/>
    </div>
  )
}

export default Home

// Taking from StepsData in assets.js, the data displayed in Home page is the Steps component which is imported from Steps.jsx
// The Header component is also imported and displayed at the top of the Home page