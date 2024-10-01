import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Educator = () => {
    const [addCourse, setaddCourse] = useState(false);
    const [title, settitle] = useState('');
    const [description, setdescription] = useState('');
    const [price, setprice] = useState('');
    const [courses, setCourses] = useState([]);
    const [isEditing, setIsEditing] = useState(false); // Track if user is editing
    const [courseId, setCourseId] = useState(null); // Store course ID for editing

    axios.defaults.baseURL = `https://sellcourse.onrender.com/api/v1/admin`;

    const addCourseEd = () => {
        setaddCourse(true);
        setIsEditing(false); // Reset to creating mode
    };

    const courseToDb = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const data = {
                title,
                description,
                price: parseFloat(price),
            };

            if (isEditing) {
                // Update the course if editing
                await axios.put(`/course/${courseId}`, data, {
                    headers: {
                        Authorization: token,
                    },
                });
            } else {
                // Create a new course if not editing
                await axios.post('/createCourse', data, {
                    headers: {
                        Authorization: token,
                    },
                });
            }

            setaddCourse(false);
            getCourses();
            settitle('');
            setdescription('');
            setprice('');
            setIsEditing(false); // Reset edit mode after submission
        } catch (error) {
            console.log(`Something went wrong while creating/updating the course: ${error.message}`);
        }
    };

    const getCourses = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('/course/bulk', {
                headers: {
                    Authorization: token,
                },
            });
            setCourses(response.data.courses);
        } catch (error) {
            console.log(`Something went wrong: ${error.message}`);
        }
    };

    useEffect(() => {
        getCourses();
    }, []);

    const logOut = () => {
        localStorage.removeItem('token');
        window.location.href = '/'; // Redirect to home page or login
    };

    const editCourseHandler = (course) => {
        // When edit is clicked, set the course data for editing
        setIsEditing(true);
        setaddCourse(true); // Show the form
        settitle(course.title);
        setdescription(course.description);
        setprice(course.price);
        setCourseId(course._id); // Store the course ID for updating
    };

    return (
        <div>
            <div>
                <h1 className='text-3xl text-center'>Welcome Educator</h1>
            </div>
            <div className='mt-2 text-center text-2xl'>
                {!addCourse ? (
                    <div className='flex gap-20 justify-center'>
                        <button className='bg-[#13610d] hover:bg-[#92b984] duration-200 sm:p-2 p-1 rounded-lg text-white' onClick={addCourseEd}>
                            Add Course
                        </button>
                        <button className='bg-[#13610d] hover:bg-[#92b984] duration-200 sm:p-2 p-1 rounded-lg text-white' onClick={logOut}>
                            LogOut
                        </button>
                    </div>
                ) : (
                    <form onSubmit={courseToDb}>
                        <label htmlFor="title" className='sm:w-[140px] w-[70px] inline-block'>
                            Title
                        </label>
                        <input
                            className='sm:w-[200px] my-2'
                            type="text"
                            value={title}
                            onChange={e => settitle(e.target.value)}
                        /> <br />
                        <label htmlFor="description" className='sm:w-[140px] w-[70px] inline-block'>
                            Description
                        </label>
                        <input
                            className='sm:w-[200px] my-2'
                            type="text"
                            value={description}
                            onChange={e => setdescription(e.target.value)}
                        /> <br />
                        <label htmlFor="price" className='sm:w-[140px] w-[70px] inline-block'>
                            Price
                        </label>
                        <input
                            className='sm:w-[200px] my-2'
                            type="text"
                            value={price}
                            onChange={e => setprice(e.target.value)}
                        /> <br />
                        <button className='bg-[#13610d] hover:bg-[#92b984] duration-200 p-1.5 rounded-lg mt-3 text-white' type='submit'>
                            {isEditing ? 'Update Course' : 'Create Course'}
                        </button>
                    </form>
                )}
            </div>
            <div className='mt-5'>
                {courses.length > 0 ? (
                    <div>
                        <h1 className='text-3xl text-black text-center'>
                            You have total {courses.length} courses, they are:
                        </h1>
                        <ul className='grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-1 text-2xl'>
                            {courses.map(course => (
                                <li key={course._id} className='border-2 border-green-800 p-2 rounded-xl'>
                                    <img src="https://appxcontent.kaxa.in/paid_course3/2024-07-07-0.8201249093606604.png" className='w-64 h-40' alt="" />
                                    <h1>Title: {course.title}</h1>
                                    <p>{course.description}</p>
                                    <p>Price: {course.price}</p>
                                    <div className='px-5 flex justify-between'>
                                        <button className='bg-[#13610d] hover:bg-[#92b984] duration-200 p-1.5 rounded-lg text-white' onClick={() => editCourseHandler(course)}>
                                            Edit
                                        </button>
                                        <button className='bg-[#13610d] hover:bg-[#92b984] duration-200 p-1.5 rounded-lg text-white'>
                                            Delete
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <h1 className='text-3xl'>You haven't created any courses yet</h1>
                )}
            </div>
        </div>
    );
};

export default Educator;
