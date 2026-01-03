import React, { useContext } from 'react'
import axios from "axios"
import { useState } from 'react'
import { useEffect } from 'react'
import { dataContext } from '../UserContext'
import { useNavigate } from 'react-router-dom'

function Home() {
    let [prompt, setPrompt] = useState("")
    let { serverUrl, setUserData, userData } = useContext(dataContext)
    let [history, setHistory] = useState([])
    let [loading, setLoading] = useState(false)

    let navigate = useNavigate()

    const sendBtn = async () => {
        try {
            setLoading(true)
            let result = await axios.post(`${serverUrl}/api/createchat`, { title: prompt }, { withCredentials: true })
            console.log(result)
            await getChat()
            setPrompt("")
            const chatId = result.data._id
            navigate(`/chat/${chatId}`)
        } catch (error) {
            console.log(`sendbtn error :${error}`)
        } finally {
            setLoading(false)
        }
    }

    const getChat = async () => {
        try {
            let result = await axios.get(`${serverUrl}/api/getchat`, { withCredentials: true })
            console.log(result)
            setHistory(result.data)
        } catch (error) {
            console.log(`getchat error: ${error}`)
        }
    }

    const logout = async () => {
        try {
            let out = await axios.get(`${serverUrl}/auth/logout`, { withCredentials: true })
            console.log(out)
            setUserData("")
            navigate("/login")
        } catch (error) {
            console.log(`logout error: ${error}`)
        }
    }

    useEffect(() => {
        getChat()
    }, [])

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-black via-zinc-900 to-black text-yellow-100 flex relative">

            <div>
                <button className='fixed right-[10px] top-[10px] px-[10px] py-[5px] rounded-lg font-semibold bg-red-500' onClick={logout}>
                    Logout
                </button>
            </div>

            <div className='w-[50px] h-[50px] left-[10px] md:hidden top-[10px] bg-white rounded-[50%] flex justify-center items-center text-black cursor-pointer absolute' >
                {userData?.avatar && (
                    <img src={userData.avatar} alt="" className='rounded-[50%] w-full h-full' />
                )}
                
            </div>

            <div className="hidden md:flex md:w-[280px] border-r border-zinc-800 bg-black/60 backdrop-blur-sm flex-col">

                <div className="px-4 py-4 border-b border-zinc-800 text-sm font-semibold">
                    Chat History
                </div>

                <div className="flex-1 overflow-y-auto p-3 space-y-2">
                    {history.map(item => (
                        <div key={item._id} onClick={() => navigate(`/chat/${item._id}`)} className="cursor-pointer rounded-lg px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-800/70 hover:text-yellow-200 transition">
                            <p className="line-clamp-2 whitespace-pre-wrap">
                                {item.title}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main */}
            <div className="flex-1 flex flex-col">
  
                <div className="border-b border-zinc-800 px-4 md:px-6 py-4 text-lg font-bold text-center">
                    AI Error Detector
                </div>

                <div className="flex-1 flex items-center justify-center px-4 md:px-6">
                    <div className="max-w-xl text-center space-y-4">
                        <h2 className="text-xl md:text-2xl font-semibold">
                            Analyze Errors Instantly
                        </h2>
                        <p className="text-zinc-400 text-sm">
                            Paste your error message below and get structured explanations,
                            fixes, and best practices.
                        </p>
                    </div>
                </div>

                <div className="border-t border-zinc-800 p-3 md:p-4 bg-black/60 backdrop-blur-sm">
                    <div className="flex flex-col md:flex-row gap-3 max-w-4xl mx-auto">
                        <input type="text" placeholder="Paste your error here..." value={prompt} onChange={(e) => setPrompt(e.target.value)} className="w-full flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-sm outline-none focus:border-yellow-400"/>
                        <button onClick={sendBtn} disabled={loading} className="w-full md:w-auto px-6 py-3 rounded-xl bg-yellow-400 text-black font-semibold hover:bg-yellow-300 disabled:opacity-50" >
                            {loading ? "Analyzing..." : "Send"}
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );

}

export default Home
