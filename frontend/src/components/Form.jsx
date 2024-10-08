import React, { useState } from 'react'
import Student from './Student'
import Educator from './Educator'
import axios from 'axios'
import Signin from './Signin'

const Form = ({ userType }) => {
    axios.defaults.baseURL = `https://sellcourse.onrender.com/api/v1/${userType}`
    const [signup, setsignup] = useState(false)
    const [username, setUsername] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [fullName, setFullName] = useState('')
    
    
    const formSubmit = async (e) => {
        e.preventDefault()
        try {

            const response = await axios.post('/signup', {
                email,
                username,
                password,
                fullName
            })


            
            setsignup(true)
        } catch (error) {
            console.log(`something went wrong ${error.message}`);
            
        }
        
        
        // alert(`form submitted by ${userType}`)
    }
  return (
    <div className='sm:mt-0 mt-16'>
        {
            !signup ? 
            (
                <div className='sm:text-2xl'>
                    <h1 className='text-black text-center mb-2'>Sign Up as an { userType }</h1>
                    <form onSubmit={formSubmit} className='text-center'>
                        
                        <input 
                            className='sm:w-[250px] text-[#008080] my-2 px-4 rounded-xl'
                            type="text"
                            value={email}
                            placeholder='email'
                            onChange={e => setemail(e.target.value)}
                        /> <br />
                        
                        <input 
                            className='sm:w-[250px] text-[#008080] my-2 px-4 rounded-xl'
                            type="text"
                            value={password}
                            placeholder='password'
                            onChange={e => setpassword(e.target.value)}
                        /> <br />
                        
                        <input 
                            className='sm:w-[250px] text-[#008080] my-2 px-4 rounded-xl'
                            type="text"
                            value={username}
                            placeholder='username'
                            onChange={e => setUsername(e.target.value)}
                        /> <br />
                        
                        <input 
                            className='sm:w-[250px] text-[#008080] my-2 px-4 rounded-xl'
                            type="text"
                            value={fullName}
                            placeholder='full name'
                            onChange={e => setFullName(e.target.value)}
                        /> <br />
                        <button className='bg-[#13610d] hover:bg-[#92b984] duration-200 p-1.5 sm:mx-36 mx-20 rounded-lg text-white' type='submit'>submit</button> 
                        {/* <button className='sm:ml-5 bg-[#13610d] hover:bg-[#92b984] duration-200 p-1.5 rounded-lg mt-3 text-white' type='submit'>Login</button>  */}
                        {/* // clicking this button and i should render to a new page based on my preference educator or student  */}
                    </form>
                </div>
            ) 
            : 
            (
                <div>
                    <Signin userType={ userType }/>
                </div>
            )
        }
    </div>
  )
}

export default Form