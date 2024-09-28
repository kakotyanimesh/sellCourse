import React, { useState } from 'react'

const Form = ({ userType }) => {

    const formSubmit = (e) => {
        // e.preventDefault()
        alert(`form submitted by ${userType}`)
    }
  return (
    <div className='sm:text-2xl'>
        <h1 className='text-black text-center mb-2'>Sign Up as an { userType }</h1>
        <form onSubmit={formSubmit}>
            <label 
                htmlFor=""
                className='sm:w-[140px] w-[70px] inline-block'
            >
                Email
            </label>
            <input 
                className='sm:w-[200px] my-2'
                type="text" 
            /> <br />
            <label 
                htmlFor=""
                className='sm:w-[140px] w-[70px] inline-block'
            >
                Password
            </label>
            <input 
                className='sm:w-[200px] my-2'
                type="text"
    
            /> <br />
            <label 
                htmlFor="password"
                className='sm:w-[140px] w-[70px] inline-block'
            >
                Username
            </label>
            <input 
                className='sm:w-[200px] my-2'
                type="text"
    
            /> <br />
            <label 
                htmlFor="password"
                className='sm:w-[140px] w-[70px] inline-block'
            >
                FullName
            </label>
            <input 
                className='sm:w-[200px] my-2'
                type="text"
    
            /> <br />
            <button className='bg-[#13610d] hover:bg-[#92b984] duration-200 p-1.5 rounded-lg mt-3 text-white' type='sumit'>submit</button> 
            {/* // clicking this button and i should render to a new page based on my preference educator or student  */}
        </form>
    </div>
  )
}

export default Form