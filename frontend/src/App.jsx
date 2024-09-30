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
    <div className='font-Autumn bg-gradient-to-r from-95% from-[#bff29f] to-[#87c39f] min-h-screen'>
      <Header/>
      <Body/>
      <Footer/>
    </div>
  )
}

export default App
