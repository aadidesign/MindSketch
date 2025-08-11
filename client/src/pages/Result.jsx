import { assets } from "../assets/assets" // Assuming assets.js contains the necessary image assets
import React, { useState } from "react"
import {motion} from "framer-motion"

function Result() {

  const [image,setImage] = useState(assets.sample_img_1)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState('')

  const onSubmitHandler = async (e) => {

  }

  return (
    <motion.form 
    initial={{ opacity: 0.2, y: 100 }}
    transition={{ duration: 1 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    onSubmit={onSubmitHandler} className="flex flex-col justify-center items-center min-h-[90vh]">
    <div>
      <div className="relative">
        <img src={image} alt="" className="max-sm-w rounded" />
        <span className= {`absolute bottom-0 left-0 h-1 bg-blue-500 ${loading? 'w-full transition-all duration-[10s]' : 'w-0'}`}/> 
        {/* Added Conditions */}
      </div>
      <p className={!loading ? 'hidden' : ''}>Loading...</p>
    </div>

    {/* We cannot retrun 2 div's so we're adding form tag to apply 2 div's */}

    {!isImageLoaded && 
    <div className="flex w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 mt-10 rounded-full">
    <input onChange={e => setInput(e.target.value)} value={input} 
    type="text" placeholder="Describe what you want to generate" className="flex-1 bg-transparent outline-none ml-8 max-sm:w-20 placeholder-color" />
    <button type="submit" className="bg-zinc-900 px-10 sm:px-16 py-3 rounded-full">Generate</button>
    </div>
    }

    {isImageLoaded &&
    <div className="flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full">
      <p onClick={() => setIsImageLoaded(false)}
      className="bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer">Generate Another</p>
      <a href={image} className="bg-zinc-900 px-10 py-3 rounded-full cursor-pointer">Download</a>          
      {/* image to download at href mentioned */}
    </div>
    }

    </motion.form>
  )
}

export default Result