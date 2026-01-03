import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { dataContext } from '../UserContext';
import { IoArrowBackCircleSharp } from "react-icons/io5";

function Chat() {
  let { chatId } = useParams();
  let { serverUrl,userData } = useContext(dataContext)
  let [prompt, setPrompt] = useState("")
  let [messages, setMessages] = useState("")
  let [newChat, setNewChat] = useState([])
  let [loading, setLoading] = useState(false)
  let navigate= useNavigate()

  const getLatestChat = async () => {
    try {
      let result = await axios.get(`${serverUrl}/api/getlatestchat/${chatId}`, { withCredentials: true })
      console.log(result.data)
      setMessages(result.data)
    } catch (error) {
      console.log(`getlatestchat error: ${error}`)
    }
  }

  const createPrompt = async () => {
    try {
      setLoading(true)
      let result = await axios.post(`${serverUrl}/api/prompt/${chatId}`, { prompt }, { withCredentials: true })
      console.log(result)
      await getPrompt()
    } catch (error) {
      console.log(`createPrompt error: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  const getPrompt = async () => {
    try {
      let result = await axios.get(`${serverUrl}/api/getPrompt/${chatId}`, { withCredentials: true })
      console.log(result)
      setNewChat(result.data)
    } catch (error) {
      console.log(`getPrompt error: ${error}`)
    }
  }


  useEffect(() => {
    getLatestChat()
  }, [])

  useEffect(() => {
    getPrompt()
  }, [])

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-zinc-900 to-black text-yellow-100 flex flex-col">

      <div className='w-[100vw] '>
        <IoArrowBackCircleSharp className='text-[3rem] fixed left-[10px] top-[7px] hover:text-yellow-400 cursor-pointer transition-all duration-200 ease-in-out' onClick={()=>navigate("/")}/>
      </div>

      <div className="border-b border-zinc-800 px-6 py-4 text-lg font-bold text-center">
        AI Error Detector
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">

        <div className="bg-black/60 border border-yellow-500/30 rounded-xl p-5">
          <div className="mb-3">
            <div className='w-[100px] h-[50px] rounded-[50%] flex justify-start items-center text-black cursor-pointer ' >
                <img src={userData.avatar} alt="" className='rounded-[50%] w-[50px] h-[50px]' />
                <p className="text-xs text-zinc-400 ml-[10px]">You</p>
            </div>
            <p className="mt-1 whitespace-pre-wrap break-words">{messages.title}</p>
          </div>

          <div className="mt-4 border-t border-zinc-700 pt-4 space-y-4">
            {messages?.response?.error_type && (
              <div>
                <p className="text-xs text-red-400 font-semibold">Error Type</p>
                <p className="mt-1">{messages.response.error_type}</p>
              </div>
            )}

            {messages?.response?.root_cause && (
              <div>
                <p className="text-xs text-orange-400 font-semibold">Root Cause</p>
                <p className="mt-1 whitespace-pre-wrap">
                  {messages.response.root_cause}
                </p>
              </div>
            )}

            {messages?.response?.simple_explanation && (
              <div>
                <p className="text-xs text-lime-400 font-semibold">Simple Explanation</p>
                <p className="mt-1 whitespace-pre-wrap">
                  {messages.response.simple_explanation}
                </p>
              </div>
            )}

            {messages?.response?.step_by_step_fix && (
              Array.isArray(messages.response.step_by_step_fix) ?
                <div>
                  <p className="text-xs text-lime-400 font-semibold">Step by Step Fix</p>
                  <p className="mt-1 whitespace-pre-wrap">
                    {messages.response.step_by_step_fix}
                  </p>
                </div>
                : <div>
                  <p className="text-xs text-lime-400 font-semibold">Step by Step Fix</p>
                  <p className="mt-1 whitespace-pre-wrap">
                    {messages.response.step_by_step_fix}
                  </p>
                </div>
            )}

            {messages?.response?.example_fix_code && (
              Array.isArray(messages.response.example_fix_code) ?
                <div>
                  <p className="text-xs text-lime-400 font-semibold">Example fix code</p>
                  <p className="mt-1 whitespace-pre-wrap">
                    {messages.response.example_fix_code}
                  </p>
                </div>
                : <div>
                  <p className="text-xs text-lime-400 font-semibold">Example fix code</p>
                  <p className="mt-1 whitespace-pre-wrap">
                    {messages.response.example_fix_code}
                  </p>
                </div>
            )}

          </div>
        </div>



        {/* Current chat */}
        {newChat.map(item => (
          <div key={item._id} className="bg-black/60 border border-yellow-500/30 rounded-xl p-5">
            <div className="mb-3">
              <div className='w-[100px] h-[50px] rounded-[50%] flex justify-start items-center text-black cursor-pointer ' >
                <img src={userData.avatar} alt="" className='rounded-[50%] w-[50px] h-[50px]' />
                <p className="text-xs text-zinc-400 ml-[10px]">You</p>
            </div>
              <p className="mt-1 whitespace-pre-wrap">{item.prompt}</p>
            </div>


            <div className="mt-4 border-t border-zinc-700 pt-4 space-y-4">

              <div>
                <p className="text-xs text-red-400 font-semibold">Error Type</p>
                <p className="mt-1">{item.response.error_type}</p>
              </div>

              <div>
                <p className="text-xs text-orange-400 font-semibold">Root Cause</p>
                <p className="mt-1 whitespace-pre-wrap">
                  {item.response.root_cause}
                </p>
              </div>

              <div>
                <p className="text-xs text-lime-400 font-semibold">Simple Explanation</p>
                <p className="mt-1 whitespace-pre-wrap">
                  {item.response.simple_explanation}
                </p>
              </div>

              {Array.isArray(item.response.step_by_step_fix) && (
                <div>
                  <p className="text-xs text-yellow-400 font-semibold">
                    Step-by-Step Fix
                  </p>
                  <ol className="list-decimal pl-6 mt-2 space-y-1">
                    {item.response.step_by_step_fix.map((step, idx) => (
                      <li key={idx} className="whitespace-pre-wrap">
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {Array.isArray(item.response.best_practices) && (
                <div>
                  <p className="text-xs text-cyan-400 font-semibold">
                    Best Practices
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    {item.response.best_practices.map((bp, idx) => (
                      <li key={idx} className="whitespace-pre-wrap">
                        {bp}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {item.response.example_fix_code && (
                <div>
                  <p className="text-xs text-purple-400 font-semibold">
                    Example Fix Code
                  </p>
                  <pre className="mt-2 bg-zinc-900 border border-zinc-700 rounded-lg p-3 text-sm overflow-x-auto">
                    {item.response.example_fix_code}
                  </pre>
                </div>
              )}

            </div>

          </div>
        ))}
      </div>

      {/* Input box */}
      <div className="border-t border-zinc-800 p-4 fixed bottom-0 bg-[#00000086] backdrop-blur-sm w-full h-[10%] flex justify-center items-center">
        <div className="flex gap-3 w-full">
          <input type="text" placeholder="Paste your error here..." value={prompt} onChange={(e) => setPrompt(e.target.value)} className="flex-1  bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-sm outline-none focus:border-yellow-400"/>
          <button onClick={createPrompt} disabled={loading} className="px-6 py-3 rounded-xl bg-yellow-400 text-black font-semibold hover:bg-yellow-300 disabled:opacity-50">{loading ? "🧐..." : "Send"}</button>
        </div>
      </div>
    </div>
  );

}

export default Chat















