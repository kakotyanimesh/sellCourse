import React, { useState } from 'react'
import Form from './Form'
import Pre from './PreForm'
import Remote from '../assets/remote.png'
import Diploma from '../assets/diploma.png'
import Target from '../assets/target.png'
import Book from '../assets/books.png'






const Body = () => {
    const [Signup, setSignup] = useState(false)
    const [userType, setUserType] = useState('')

    const showForm = (type) => {
        setUserType(type)
        setSignup(true)
        // alert('asdasd')
    }
  return (
    <div className=''>
    {
        !Signup ? 
        (
            <div className='flex flex-col justify-center items-center sm:mt-36 mt-28'>
                <div className='sm:text-5xl text-2xl px-5 text-center font-bold text-[#0E1219]'>
                    <h1>Udemy’s Cool, but We’ve Got the Good Stuff –<span className='text-[#008080]'> Welcome to EduNexus</span></h1>
                </div>
                <div className='pt-10 sm:text-2xl text-xm flex space-x-5 text-white '>
                {/* we passed the prop of educator or student the form func and will passed to Form component also */}
                    <button className='bg-[#13610d] hover:bg-[#92b984] duration-200 sm:p-2 p-1 rounded-lg' onClick={() => showForm('admin')}>Signup as Educator</button>  
                    <button className='bg-[#13610d] hover:bg-[#92b984] duration-200 sm:p-2 p-1 rounded-lg' onClick={() => showForm('user')}>Signup as Student</button>
                </div>
                <div className='mt-20'>
                    <h1 className='text-center sm:text-3xl font-black mb-3 text-[#008080]'>Provided Features</h1>
                    <div className='grid sm:grid-cols-2 lg:grid-cols-4  gap-24 mt-10'>
                        <div className='text-center w-56 px-10'>
                            <img src={Remote} alt="" className=''/>
                            <h3 className='font-black mt-5 text-xl text-[#008080]'>Remote Friendly </h3>
                            <p className='text-lg leading-4'>remote-friendly courses are reshaping the future of education</p>
                        </div>
                        <div className='text-center w-56 px-10'>
                            <img src={Diploma} alt=""  className=''/>
                            <h3 className='font-black mt-5 text-xl text-[#008080]'>Digital Diploma </h3>
                            <p className='text-lg leading-4'>Digital courses are reshaping the future of education</p>
                        </div>
                        <div className='text-center w-56 px-10'>
                            <img src={Target} alt=""  className=''/>
                            <h3 className='font-black mt-5 text-xl text-[#008080]'>Private Target </h3>
                            <p className='text-lg leading-4'>Private Target courses are reshaping the future of education</p>
                        </div>
                        <div className='text-center w-56 px-10'>
                            <img src={Book} alt=""  className='bg-none'/>
                            <h3 className='font-black mt-5 text-xl text-[#008080]'>Modern Method </h3>
                            <p className='text-lg leading-4'>Modern Method courses are reshaping the future of education</p>
                        </div>

                    </div>
                </div>
            </div>
        ) 
        : 
        (
            <div className='flex justify-center items-center sm:mt-20'>
                {/* we are the sending userType props to Form element */}
                <Pre userType={userType} />
            </div>
        ) 
    }
    </div>
  )
}

export default Body