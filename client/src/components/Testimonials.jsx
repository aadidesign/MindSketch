import React from 'react'
import { testimonialsData, assets } from '../assets/assets'          // Assuming testimonialsData is an array of testimonial objects with name, image, and text from assets.js

function Testimonials() {
  return (
    <div className='flex flex-col items-center justify-center my-20 py-12'> 
    <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>
        Customer Testimonials
    </h1>
    <p className='text-gray-500 mb-12'>
        What our users are saying about us
    </p>

    <div className='flex flex-wrap gap-6'>
        {testimonialsData.map((testimonial, index)=>(
            <div key={index} className='bg-white/20 p-12 rounded-lg shadow-md order w-80 m-auto cursor-pointer hover:scale-[1.02] transition-all'>
                <div className='flex flex-col items-center'>
                    <img src={testimonial.image} alt="" className='rounded-full w-14'/>
                    <h2 className='text-xl font-semibold mt-3'>{testimonial.name}</h2>
                    <p className='text-gray-500 mb-4'>{testimonial.role}</p>
                    <div className='flex mb-4'>
                        {Array(testimonial.stars).fill().map((item,index)=>(
                            <img key={index} src={assets.rating_star} alt=''/>
                        ))}
                    </div>
                    <p className='text-center text-sm text-gray-600 '>{testimonial.text}</p>
                </div>
            </div>
        ))}
    </div>

    </div>   // Copied the Classname from Description.jsx and modified the content
  )
}

export default Testimonials