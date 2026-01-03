import React, { useContext } from 'react'
import { Navigate, Route, Routes } from "react-router-dom"
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { dataContext } from './UserContext'
import Chat from './pages/Chat'

function App() {
  let { userData, authLoading } = useContext(dataContext)

  if (authLoading) {
    return (
      <div className="min-h-screen bg-black p-6 animate-pulse">
        <div className="h-6 w-40 bg-zinc-800 rounded mb-6" />
        <div className="flex gap-6">
          <div className="w-64 h-[70vh] bg-zinc-800 rounded-xl hidden md:block" />
          <div className="flex-1 space-y-4">
            <div className="h-8 w-2/3 bg-zinc-800 rounded" />
            <div className="h-4 w-full bg-zinc-800 rounded" />
            <div className="h-4 w-5/6 bg-zinc-800 rounded" />
          </div>
        </div>
      </div>
    )
  }


  return (
    <div>
      <Routes>
        <Route path='/signup' element={userData ? <Navigate to="/" /> : <Signup />} />
        <Route path='/login' element={userData ? <Navigate to="/" /> : <Login />} />
        <Route path='/' element={userData ? <Home /> : <Navigate to="/login" />} />
        <Route path='/chat/:chatId' element={userData ? <Chat /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  )
}

export default App
