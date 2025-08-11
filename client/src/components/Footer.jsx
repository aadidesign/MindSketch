import React from 'react'
import { assets } from '../assets/assets'

function Footer() {
  return (
    <div className='grid grid-cols-3 items-center py-3 mt-20 w-full'>
      {/* Left: Logo and copyright */}
      <div className='flex items-center gap-4'>
        <img src={assets.logo} alt="" width={150} />
        <p className='border-l border-gray-400 pl-4 text-gray-500 max-sm:hidden text-sm'>
          Copyright @Aadi.designer | All rights reserved.
        </p>
      </div>

      {/* Center: Made with love */}
      <div className='flex justify-center'>
        <p className='text-gray-500 text-sm'>
          Made with <span className='text-red-500'>❤️</span> by Aadi
        </p>
      </div>

      {/* Right: Social icons */}
      <div className='flex justify-end gap-2.5'>
        <button className='border-gray-400 rounded-full p-2'>
          <img src={assets.facebook_icon} alt="Facebook" width={35} />
        </button>
        <button className='border-gray-400 rounded-full p-2'>
          <img src={assets.instagram_icon} alt="Instagram" width={35} />
        </button>
        <button className='border-gray-400 rounded-full p-2'>
          <img src={assets.twitter_icon} alt="Twitter" width={35} />
        </button>
      </div>
    </div>
  )
}

export default Footer




// import React from 'react'
// import { assets } from '../assets/assets'

// function Footer() {
//   return (
//     <div className='flex items-center justify-between gap-4 py-3 mt-20 grid grid-cols-4'>

//         <img src={assets.logo} alt="" width={150} />
//         <p className='flex-1 border-1 border-gray-400 pl-4 text-400 text-gray-500 max-sm:hidden'>Copyright @Aadi.designer | All rights reserved.</p>
//          <div className='flex justify-center'>
//         <p className='text-gray-500 text-sm'>
//           Made with <span className='text-red-500'>❤️</span> by Aadi
//         </p>
//       </div>
        

//         <div className='flex gap-2.5'>
//             <img src={assets.facebook_icon} alt="" width={35} />
//             <img src={assets.instagram_icon} alt="" width={35} />
//             <img src={assets.twitter_icon} alt="" width={35} />
//         </div>

//     </div>
//   )
// }

// export default Footer