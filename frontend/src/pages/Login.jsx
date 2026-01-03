import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { dataContext } from '../UserContext'

function Login() {
  let { serverUrl, userData, setUserData } = useContext(dataContext)
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  let [err, setErr] = useState("")
  let [showErr, setShowErr] = useState(false)
  let [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    try {
      setLoading(true)
      let result = await axios.post(`${serverUrl}/auth/login`, { email, password }, { withCredentials: true })
      setUserData(result.data)
      navigate("/")
      setShowErr(false)
    } catch (error) {
      console.log(error.response.data.message)
      setErr(error.response.data.message)
      setShowErr(true)
    }finally{
      setLoading(false)
    }
  }

  let navigate = useNavigate()

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-zinc-900 to-black flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-black/60 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 md:p-8 text-yellow-100">

        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-sm text-zinc-400 mt-1">
            Sign in to continue analyzing errors
          </p>
        </div>

        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="email" className="text-sm text-zinc-300">
            Email
          </label>
          <input type="email" id="email" placeholder="you@example.com" className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-sm outline-none focus:border-yellow-400" onChange={(e) => setEmail(e.target.value)} value={email}/>
        </div>

        <div className="flex flex-col gap-2 mb-6">
          <label htmlFor="password" className="text-sm text-zinc-300">
            Password
          </label>
          <input type="password" id="password" placeholder="••••••••" className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-sm outline-none focus:border-yellow-400" onChange={(e) => setPassword(e.target.value)} value={password} />
        </div>

        <button onClick={handleLogin} className="w-full py-3 rounded-xl bg-yellow-400 text-black font-semibold hover:bg-yellow-300 transition" disabled={loading}>
          {loading?"Wait🦥":"Login"}
        </button>

        {showErr && <div className='w-full text-center mt-[20px]'>
          <p>{err}</p>
        </div>}

        <div className="text-center mt-6 text-sm text-zinc-400">
          Not have an account?{" "}
          <span onClick={() => navigate("/signup")} className="text-yellow-400 cursor-pointer hover:underline">
            Sign up
          </span>
        </div>

      </div>
    </div>
  )
}

export default Login
