import axios from 'axios'
import React, { useState } from 'react'

const Educator = () => {
    const [addCourse, setaddCourse] = useState(false)
    const [title, settitle] = useState('')
    const [description, setdescription] = useState('')
    const [price, setprice] = useState('')

    axios.defaults.baseURL = `http://localhost:3002/api/v1/admin`
    // const [first, setfirst] = useState(second)

    const addCourseEd = () => {
        setaddCourse(true)
    }


    const courseToDb = (e) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('token')
            // console.log(token);
            
            axios.post('/createCourse', {
                title,
                description,
                price : parseFloat(price),

            },{
                headers : {
                    Authorization : token
                }
            })
        } catch (error) {
            
        }
        
    }
  return (
    // we are gonna have three things here : => Create Course button => Display the courses created by the educator and Edit button in every course 
    <div>
        <div>
            <h1 className='text-3xl'>Welcome Educator</h1>
        </div>
        <div className='mt-20 text-center text-2xl'>
            {
                !addCourse ? <button className='bg-[#13610d] hover:bg-[#92b984] duration-200 sm:p-2 p-1 rounded-lg text-white' onClick={addCourseEd}>Add Course</button> 
                :
                <form onSubmit={courseToDb}>
                <label 
                    htmlFor=""
                    className='sm:w-[140px] w-[70px] inline-block'
                >
                    Title 
                </label>
                <input 
                    className='sm:w-[200px] my-2'
                    type="text"
                    value={title}
                    onChange={e => settitle(e.target.value)} 
                /> <br />
                <label 
                    htmlFor=""
                    className='sm:w-[140px] w-[70px] inline-block'
                >
                    Decription 
                </label>
                <input 
                    className='sm:w-[200px] my-2'
                    type="text"
                    value={description}
                    onChange={e => setdescription(e.target.value)}
        
                /> <br />
                <label 
                    htmlFor="password"
                    className='sm:w-[140px] w-[70px] inline-block'
                >
                    Price
                </label>
                <input 
                    className='sm:w-[200px] my-2'
                    type="text"
                    value={price}
                    onChange={e => setprice(e.target.value)}
        
                /> <br />
                <button className='bg-[#13610d] hover:bg-[#92b984] duration-200 p-1.5 rounded-lg mt-3 text-white' type='sumit'>submit</button> 
                {/* // clicking this button and i should render to a new page based on my preference educator or student  */}
            </form>
            }
        </div>
        <div>
            tiasd
        </div>
        
    </div>
  )
}

export default Educator