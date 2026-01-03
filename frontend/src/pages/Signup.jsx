import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { dataContext } from '../UserContext'

function Signup() {
  let { serverUrl, userData, setUserData } = useContext(dataContext)
  let [name, setName] = useState("")
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  let [err, setErr] = useState("")
  let [showErr, setShowErr] = useState(false)
  let [loading, setLoading] = useState(false)
  let [frontendImg,setFrontendImg]= useState("")
  let [backendImg,setBackendImg]= useState("")

  const handleSignUp = async () => {
    try {
      setLoading(true)
      let formdata= new FormData()
      formdata.append("name",name),
      formdata.append("email",email),
      formdata.append("password",password)
      if(backendImg){
        formdata.append("avatar",backendImg)
      }

      let result = await axios.post(`${serverUrl}/auth/signup`,formdata,{ withCredentials: true })
      setUserData(result.data)
      navigate("/")
      setShowErr(false)
    } catch (error) {
      console.log(error.response.data.message)
      setErr(error.response.data.message)
      setShowErr(true)
    } finally {
      setLoading(false)
    }
  }

  const handleImage= async(e)=>{
    try {
      let file= e.target.files[0]
      setBackendImg(file)
      let image= URL.createObjectURL(file)
      setFrontendImg(image)
    } catch (error) {
      console.log(`handleImage error: ${error}`)
    }
  }

  let navigate = useNavigate()

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-zinc-900 to-black flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-black/60 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 md:p-8 text-yellow-100">

        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Create Account</h1>
          <p className="text-sm text-zinc-400 mt-1">
            Start analyzing errors with AI
          </p>
        </div>

        

        <div className='w-full flex justify-center items-center' >
          <div className='w-[100px] h-[100px] bg-white rounded-[50%] flex justify-center items-center text-black cursor-pointer' >
            <img src={frontendImg} className='rounded-[50%] w-full h-full'/>
          </div>
        </div>
        <div className='w-full flex justify-center items-center'>
          <input type="file"  onChange={(e)=>handleImage(e)} className='text-[10px] flex-1 break-words whitespace-pre-wrap'/>
        </div>
        

        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="name" className="text-sm text-zinc-300">
            Name
          </label>
          <input type="text" id="name" placeholder="Your name" className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-sm outline-none focus:border-yellow-400" onChange={(e) => setName(e.target.value)} value={name} />
        </div>

        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="email" className="text-sm text-zinc-300">
            Email
          </label>
          <input type="email" id="email" placeholder="you@example.com" className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-sm outline-none focus:border-yellow-400" onChange={(e) => setEmail(e.target.value)} value={email} />
        </div>

        <div className="flex flex-col gap-2 mb-6">
          <label htmlFor="password" className="text-sm text-zinc-300">
            Password
          </label>
          <input type="password" id="password" placeholder="••••••••" className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-sm outline-none focus:border-yellow-400" onChange={(e) => setPassword(e.target.value)} value={password}/>
        </div>

        <button onClick={handleSignUp} className="w-full py-3 rounded-xl bg-yellow-400 text-black font-semibold hover:bg-yellow-300 transition" disabled={loading}>
          {loading ? "Wait🦥" : "Signup"}
        </button>

        {showErr && (
          <div className="w-full text-center mt-[20px]">
            <p>{err}</p>
          </div>
        )}

        <div className="text-center mt-6 text-sm text-zinc-400">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")} className="text-yellow-400 cursor-pointer hover:underline">
            Login
          </span>
        </div>

      </div>
    </div>
  )
}

export default Signup
