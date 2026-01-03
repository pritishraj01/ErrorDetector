import React, { useContext } from 'react'
import {Navigate, Route, Routes} from "react-router-dom"
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { dataContext } from './UserContext'
import Chat from './pages/Chat'

function App() {
  let {userData}= useContext(dataContext)
  return (
    <div>
      <Routes>
        <Route path='/signup' element={userData?<Home/>: <Signup/>} />
        <Route path='/login' element={userData?<Home/>: <Login/>}/>
        <Route path='/' element={userData?<Home/>: <Login/>}/>
        <Route path='/chat/:chatId' element={userData?<Chat/>: <Login/>}/>
      </Routes>
    </div>
  )
}

export default App
