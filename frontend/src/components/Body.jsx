import React, { useState } from 'react'
import Form from './Form'
import Pre from './Pre'




const Body = () => {
    const [Signup, setSignup] = useState(false)
    const [userType, setUserType] = useState('')

    const showForm = (type) => {
        setUserType(type)
        setSignup(true)
        // alert('asdasd')
    }
  return (
    <>
    {
        !Signup ? 
        (
            <div className='flex flex-col justify-center items-center sm:mt-36 mt-28'>
                <div className='sm:text-5xl text-2xl px-5 text-center font-bold text-[#044501]'>
                    <h1>Udemy’s Cool, but We’ve Got the Good Stuff – Welcome to EduNexus!</h1>
                </div>
                <div className='pt-10 sm:text-2xl text-xm flex space-x-5 text-white '>
                {/* we passed the prop of educator or student the form func and will passed to Form component also */}
                    <button className='bg-[#13610d] hover:bg-[#92b984] duration-200 sm:p-2 p-1 rounded-lg' onClick={() => showForm('admin')}>Signup as Educator</button>  
                    <button className='bg-[#13610d] hover:bg-[#92b984] duration-200 sm:p-2 p-1 rounded-lg' onClick={() => showForm('user')}>Signup as Student</button>
                </div>
            </div>
        ) 
        : 
        (
            <div className='flex justify-center items-center mt-20'>
                {/* we are the sending userType props to Form element */}
                <Pre userType={userType} />
            </div>
        ) 
    }
    </>
  )
}

export default Body