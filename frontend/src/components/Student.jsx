import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Student = ({ userType }) => {
  axios.defaults.baseURL = `https://sellcourse.onrender.com/api/v1/user`
  const [buyCourses, setBuyCourses] = useState(false)
  const [courses, setCourses] = useState([])
  const [previewCourse, setpreviewCourse] = useState([])

  const courseBuy = async (e) => {
    e.preventDefault()
    try {

      const response = await axios.get('https://sellcourse.onrender.com/api/v1/course/preview')
      setpreviewCourse(response.data.courses)
      setBuyCourses(true)
      // getCourses()
    } catch (error) {
      
    }
  }

  const dashBoard = async (e) => {
    e.preventDefault()
    setBuyCourses(false)
    await getCourses()
  }

  useEffect(() => {
    getCourses()
  }, [])
  

  const getCourses = async () => {
    try {
      const token = localStorage.getItem('token')

      const usercourse = await axios.get('/userCourse', {
        headers : {
          Authorization : token
        }
      })

      setCourses(usercourse.data.courses)
      // console.log(courses);
      
    } catch (error) {
      console.log(`Error while fetching courses : ${error.message}`);
    }
  }


  const buyACourse = async (courseId) => {
    // e.preventDefault()
    try {
      const token = localStorage.getItem('token')

      await axios.post('https://sellcourse.onrender.com/api/v1/course/buyCourse',
        { courseId },
        {
          headers : {
            Authorization : token
          }
        }
      )
      alert('course purchased successfully ')

    } catch (error) {
      console.log(`something went wrong while purchasing the course : ${error.message}`);
      
    }
  }

  const view = (e) => {
    e.preventDefault()
    alert('Working on It.....')
  }

  const logOut = () => {
    location.reload()
    localStorage.removeItem('token')
  }
  
  return (
    <div className=''>
        <div className=' text-center sm:gap-40 gap-5 mt-10 '>
          <h1 className='text-4xl'>Welcome Student </h1>
          <button className='bg-[#13610d] mt-8 hover:bg-[#92b984] duration-200 p-1.5 rounded-lg ml-5 text-white' onClick={courseBuy} >BUY Course </button>
          <button className='bg-[#13610d] hover:bg-[#92b984] duration-200 p-1.5 rounded-lg ml-5 text-white' onClick={logOut} >LogOut </button>
          <button className='bg-[#13610d] hover:bg-[#92b984] duration-200 p-1.5 rounded-lg ml-5 text-white' onClick={dashBoard}>DashBoard </button>

        </div>
        {
          !buyCourses ? 
          (
            <div className='mt-5 text-2xl text-center'>
              {
                courses.length > 0 ? 
                (
                  <div>
                    <h1>You have bought {courses.length} courses</h1>
                    <ul className='grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-2text-2xl'>
                      {courses.map(course => (
                        <li key={course._id} className='border border-green-600 p-1 rounded-xl'>
                          <img src="https://appxcontent.kaxa.in/paid_course3/2024-07-07-0.8201249093606604.png" className='w-full p-3 h-44 rounded-2xl' alt="" srcset="" />
                          <h1>Title : {course.courseId.title}</h1>
                          <h1>Description : {course.courseId.description}</h1>
                          <button className='bg-[#13610d] hover:bg-[#92b984] duration-200 p-1.5 rounded-lg ml-5 text-white' onClick={view}>View </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) :
                (
                  <div>
                    <h1>You have 0 😭😭 courses ! Please 🙏 🙏Buy Something </h1>
                  </div>
                )
          }
        </div>
          ) : 
          (
            <div>
              {/* <button className='bg-[#13610d] hover:bg-[#92b984] duration-200 p-1.5 rounded-lg ml-5 text-white' onClick={dashBoard}>DashBoard </button> */}
              <ul className='grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-1 text-2xl'>
                {previewCourse.map(course => (
                  <li key={course._id} className='border border-green-600 p-1 text-center rounded-xl'>
                    <img src="https://appxcontent.kaxa.in/paid_course3/2024-07-07-0.8201249093606604.png" className='w-full p-3 h-44 rounded-2xl' alt="" srcset="" />
                    <h1>TITLE : {course.title}</h1>
                    <h1>DESCRIPTION : {course.description}</h1>
                    <h1>PRICE : ₹{course.price}</h1>
                    <button className='bg-[#13610d] hover:bg-[#92b984] duration-200 p-1.5 rounded-lg ml-5 text-white' onClick={() => buyACourse(course._id)}>Buy </button>
                  </li>
                ))}
              </ul>
            </div>
          )
        }
    </div>
  )
}

export default Student