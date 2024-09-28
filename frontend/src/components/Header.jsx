import React from 'react'

const Header = () => {
  return (
    <div className='flex justify-between pt-10 sm:px-28 px-7'>
        <div className='sm:text-4xl text-xl font-black text-[#044501]	'>
            <h1>EduNexus</h1>
        </div>
        <div className='flex justify-between gap-5 text-lg font-semibold sm:text-3xl'>
            <a href="">Couses</a>
            <a href=''>About Us</a>
            <a href=''>Pricing</a>
            {/* <button>night</button> */}
        </div>
    </div>
  )
}

export default Header