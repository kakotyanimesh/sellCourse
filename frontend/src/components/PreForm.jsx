import Reac, { useState } from 'react'
import Form from './Form'
import Signin from './Signin'

const Pre = ({  userType }) => {
    const [idk, setIdk] = useState(false)
    const [formL, setformL] = useState(false)

    const changeForm = (e) => {
        e.preventDefault()
        setIdk(true)
        setformL(true)
    }
    
    const chageLogin = (e) => {
        e.preventDefault()
        setIdk(true)
        setformL(false)
    }

  return (
    <div>
        {
            !idk ? 
            (
                <div className='sm:mt-28 mt-48'>
                <p className="pt-1 sm:text-3xl text-xl font-bold sm:pb-5">Empowering educators and students through learning.</p>
                <div className='sm:text-3xl text-xl flex justify-between px-20'>
                    <button className='bg-[#13610d] hover:bg-[#92b984] duration-200 p-1.5 rounded-lg mt-3 text-white' onClick={changeForm}>JOIN</button> 
                    <button className='sm:ml-5 bg-[#13610d] hover:bg-[#92b984] duration-200 p-1.5 rounded-lg mt-3 text-white' onClick={chageLogin}>LogIn</button>     
                </div>
                </div>
            ) :
            (
                <div>
                    {formL ? (<Form userType={ userType }/>) : (<Signin userType={ userType }/>)}
                </div>
            )
        }
    </div>
  )
}

export default Pre