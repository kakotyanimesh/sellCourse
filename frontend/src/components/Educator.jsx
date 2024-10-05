import axios from 'axios'
import React, { useState, useEffect } from 'react'

const Educator = () => {
    const [addCourse, setaddCourse] = useState(false)
    const [title, settitle] = useState('')
    const [description, setdescription] = useState('')
    const [price, setprice] = useState('')
    const [courses, setCourses] = useState([])
    const [edit, setEdit] = useState(false)
    const [courseId, setCourseId] = useState('')

    axios.defaults.baseURL = `https://sellcourse.onrender.com/api/v1/admin`
    // axios.defaults.baseURL = `http://localhost:3002/api/v1/admin`
    // const [first, setfirst] = useState(second)

    const addCourseEd = () => {
        setaddCourse(true)
        setEdit(false)
    }


    const courseToDb = async (e) => {
        // e.preventDefault()
        try {
            const token = localStorage.getItem('token')
            // console.log(token);
            
            await axios.post('/createCourse', {
                title,
                description,
                price : parseFloat(price),

            },{
                headers : {
                    Authorization : token
                }
            })
            setaddCourse(false)
            getCourse()
            settitle('')
            setdescription('')
            setprice('')
        } catch (error) {
            console.log(`something went wrong while creating the course ${error.message}`);
        }
        
    }

    const getCourse = async () => {
        try {
            const token = localStorage.getItem('token')
            const response = await axios.get('/course/bulk',
                {
                    headers : {
                        Authorization : token
                    }
                }
            )
            setCourses(response.data.courses)
        } catch (error) {
            console.log(`something went wrong : ${error.message}`);
            
        }
    }

    useEffect(() => {
      getCourse()
    }, [])
    
    const logOut = (e) => {
        // e.preventDefault()
        localStorage.removeItem('token')
        location.reload();
    }

    const editCourse = (course) => {
        // e.preventDefault()
        setEdit(true)
        setaddCourse(true)
        setCourseId(course._id)
        console.log('asdadsads');
        

    }

    const updateCourse = async () => {
        // console.log("asdadsa");
        try {
            const token = localStorage.getItem('token')
            await axios.put('/updateCourse', {
                title,
                description,
                price : parseFloat(price),
                courseId
            },
            {
                headers : {
                    Authorization : token
                }
            }
        )
            setaddCourse(false)
            getCourse()
            settitle('')
            setdescription('')
            setprice('')
            alert('course updated successfully !! ')
        } catch (error) {
            console.log(`${error.message}`);
            
        }

        
    }


    const deleteCourse = async (course) => {
        const courseId = course._id
        try {
            const token = localStorage.getItem('token')
            await axios.delete('/deleteCourse', {
                headers : {
                    Authorization : token
                },
                data : {
                    courseId
                }
            })
    
            await getCourse()
            alert('course deleted successfully !! ')
        } catch (error) {
            console.log(`unable to delete course ${error.message}`);
            
        }
    }
  return (
    // we are gonna have three things here : => Create Course button => Display the courses created by the educator and Edit button in every course 
    <div>
        <div>
            <h1 className='text-3xl text-center'>Welcome Educator</h1>
        </div>
        <div className='mt-2 text-center text-2xl'>
            {
                !addCourse ? (
                    <div className='flex gap-20 justify-center'>
                        <button className='bg-[#13610d] hover:bg-[#92b984] duration-200 sm:p-2 p-1 rounded-lg text-white' onClick={addCourseEd}>Add Course</button>
                        <button className='bg-[#13610d] hover:bg-[#92b984] duration-200 sm:p-2 p-1 rounded-lg text-white' onClick={logOut}>LogOut</button>
                    </div>
                    
                ) 
                :
                
                <form onSubmit={(e) => {
                    e.preventDefault()
                    if(edit) {
                        updateCourse()
                    } else {
                        courseToDb()
                    }
                }}>
                <input 
                    className='sm:w-[200px] px-4 rounded-xl text-[#008080] my-2'
                    type="text"
                    value={title}
                    placeholder='Title'
                    onChange={e => settitle(e.target.value)} 
                /> <br />
                <input 
                    className='sm:w-[200px] px-4 rounded-xl text-[#008080] my-2'
                    type="text"
                    value={description}
                    placeholder='Description'
                    onChange={e => setdescription(e.target.value)}
        
                /> <br />
                <input 
                    className='sm:w-[200px] my-2 px-4 rounded-xl text-[#008080]'
                    type="text"
                    value={price}
                    placeholder='price'
                    onChange={e => setprice(e.target.value)}
        
                /> <br />
                <button className='bg-[#13610d] hover:bg-[#92b984] duration-200 p-1.5 rounded-lg mt-3 text-white' type='submit'>
                    {edit ? 'upadate Course' : 'Add Course'}
                </button> 
                {/* // clicking this button and i should render to a new page based on my preference educator or student  */}
                </form>
            }
        </div>
        <div className='mt-5'>
            {
                courses.length > 0 ? 
                (
                    <div>
                        <h1 className='text-3xl text-black text-center'>You have total {courses.length} & they are </h1>
                        <ul className='grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-1 text-2xl'>
                            {courses.map(course => (
                                <li key={course._id} className='border-2 border-green-800 p-2 rounded-xl'>
                                    <img src="https://appxcontent.kaxa.in/paid_course3/2024-07-07-0.8201249093606604.png" className='w-64 h-40' alt="" srcset="" />
                                    <h1>Title : {course.title}</h1>
                                    <p>DESCRIPTION : {course.description}</p>
                                    <p>Price : {course.price}</p>
                                    <div className='px-5 flex justify-between'>
                                        <button className='bg-[#13610d] hover:bg-[#92b984] duration-200 p-1.5 rounded-lg text-white' onClick={() => editCourse(course)}>Edit</button> 
                                        <button className='bg-[#13610d] hover:bg-[#92b984] duration-200 p-1.5 rounded-lg text-white' onClick={() => deleteCourse(course)}>Delete</button> 
                                    </div>

                                </li>
                            ))}
                        </ul>
                    </div>
                ) : 

                <h1 className='text-3xl'>You havenot created any courses yet </h1>
            }

        </div>
        
    </div>
  )
}

export default Educator