import { useState } from 'react'
import axios from 'axios'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header from './components/Header'
import Body from './components/Body'
import Footer from './components/Footer'
import './App.css'

function App() {

  axios.defaults.baseURL = 'http://localhost:3002'
  return (
    <div className='font-Autumn bg-[#F4F4F4] min-h-screen text-[#044501]'>
      <Header/>
      <Body/>
      <Footer/>
    </div>
  )
}

export default App
