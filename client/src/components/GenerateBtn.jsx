import React from 'react'
import { assets } from '../assets/assets' // Assuming assets.js contains the necessary image assets
import { motion } from "framer-motion"
import { useContext } from 'react'
import { AppContext } from '../context/AppContext' // Assuming AppContext is defined in context/AppContext.js
import { useNavigate } from 'react-router-dom'

function GenerateBtn() {

  //As done for Above Button in Home Page
  const {user, setShowLogin} = useContext(AppContext)
    const navigate = useNavigate()

    const onClickHandler =() => {
        if(user){
            navigate('/result')
        }
        else{
            setShowLogin(true)  // Show login modal if user is not logged in
        }
    }

  return (
    <motion.div
    initial={{opacity:0.2, y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1, y:0}}
    viewport={{once:true}} 
    className='pb-16 text-center'>
        <h1 className='text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold text-neutral-800 py-6 md:py-16'>See the magic. Try now.</h1>
        <button 
        onClick={onClickHandler}
        className='inline-flex items-center gap-2 px-12 py-3 rounded-full bg-black text-white m-auto hover:scale-105 transition-all duration-500 '>Generate Images
            <img src={assets.star_group} alt="" className='h-6' />
        </button>
    </motion.div>

    //sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full

  )
}

export default GenerateBtn