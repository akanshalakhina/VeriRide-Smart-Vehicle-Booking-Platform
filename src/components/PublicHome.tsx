
'use client' // This is a client component, it can use state and effects to do all things we can do in react to do in next.js
import React, { useState } from 'react'
import HeroSection from './HeroSection'
import VechileSlider from './VechileSlider'
import AuthModel from './AuthModel'

function PublicHome() {
    const [authOpen, setAuthOpen]=useState(false)
  return (
    <>
    <HeroSection/>
    <VechileSlider/>
    <AuthModel open={authOpen} onClose={() => setAuthOpen(false)} />

      
    </>
  )
}

export default PublicHome
