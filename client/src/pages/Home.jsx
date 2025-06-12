import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'

const Home = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-100">
      <div className="absolute inset-0 bg-[url('/bg_img.png')] bg-cover bg-center opacity-10 pointer-events-none z-0" />
      <Navbar showLoginButton={true}/>
      <Header />
    </div>
  )
}

export default Home
