import axios from 'axios'
import React, { useState } from 'react'
import Student from './Student'
import Educator from './Educator'


const Signin = ( { userType }) => {
    axios.defaults.baseURL = `https://sellcourse.onrender.com/api/v1/${userType}`
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [logged, setLogged] = useState(false)

    const logIn = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('/signin', {
                email,
                password
            })

            localStorage.setItem("token", response.data.token)
            setLogged(true)
        } catch (error) {
            console.log(`something went wrong ${error.message}`);
        }
        
    }
  return (
    <div className='sm:mt-0 mt-24'>
        {
            !logged ? 
            (
                <form onSubmit={logIn} className='text-center text-2xl'>
            <label 
                htmlFor="Email"
                className='sm:w-[180px] w-[70px] inline-block'
            >
                Email
            </label>
            <input 
                type="text" 
                className='sm:w-[200px] text-[#008080] rounded-xl my-3 px-2'
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <br />
            <label 
                htmlFor="password"
                className='sm:w-[180px] w-[70px] inline-block'
            >
            Password
            </label>
            <input 
                type="text"
                className='sm:w-[200px] text-[#008080] rounded-xl my-3 px-2'
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <br />
            <button className='bg-[#13610d] hover:bg-[#92b984] duration-200 p-1.5 rounded-lg mt-3 text-white' type='sumit'>
                login
            </button>
        </form>
            ) 
            : 
            (
                <div>
                    { userType  === 'user' ? <Student/> : <Educator/>}
                </div>
            )
        }
    </div>
  )
}

export default Signin