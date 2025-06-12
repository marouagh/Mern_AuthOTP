import { useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContent } from '../context/AppContext'

const Header = () => {

  const {userData} = useContext(AppContent)


  return (
    <div className="z-10 flex flex-col items-center mt-28 px-4 text-center text-gray-800 animate-fade-in">
      <img src={assets.header_img} className="w-36 h-36 rounded-full mb-6 shadow-md" alt="Profile" />
      
      <h1 className="flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2">
        Hey {userData ? userData.name:  'Developer'}!
        <img className="w-7 h-7" src={assets.hand_wave} alt="Wave" />
      </h1>
      
      <h2 className="text-3xl sm:text-5xl font-bold mb-4 text-emerald-700">
        Welcome to our app
      </h2>
      
      <p className="mb-8 max-w-md text-gray-600 leading-relaxed">
        Let's start with a quick product tour and we will have you up and running in no time!
      </p>

      <button className="bg-emerald-600 text-white px-8 py-3 rounded-full shadow-md hover:bg-emerald-700 transition duration-300">
        Get Started
      </button>
    </div>
  )
}

export default Header
