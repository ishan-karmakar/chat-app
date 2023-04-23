import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"

const ChatPage = ({socket}) => {
    const navigate = useNavigate()
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState("")
    const username = sessionStorage.getItem("userName")
    if (!username)
        navigate("/")
    useEffect(()=> {
        socket.on("messageResponse", data => setMessages([...messages, data]))
    }, [socket, messages])

    function sendMessage(e) {
        e.preventDefault()
        if (message.trim() && username) {
            const jsonMsg = {
                name: username,
                message
            }
            socket.emit("message", jsonMsg)
            setMessages([...messages, jsonMsg])
        }
        setMessage("")
    }

    return (
        <div className="relative flex container border-2 rounded-2xl mx-auto top-1/2 -translate-y-1/2 bg-[#1b1b1b] border-[#181a1b]">
            <div className="w-full">
                <span className="flex p-3 border-b border-gray-900 mx-2 font-bold text-white">{sessionStorage.getItem("userName")}</span>
                <div className="flex p-6 flex-col-reverse h-[40rem] overflow-y-auto no-scrollbar">
                    <ul className="space-y-2">
                        {messages.map((m, i) => {
                            return (
                                <li className={`flex ${username === m.name ? "justify-end" : "justify-start"}`} key={i}>
                                    <div className='flex flex-col'>
                                        {username !== m.name && (i === 0 || messages[i - 1].name !== m.name) ?
                                        <span className='text-sm font-bold pl-2 text-white'>{m.name}</span>
                                        : null}
                                        <span className={`px-4 py-2 text-white rounded shadow ${username === m.name ? "bg-[#1982FC]" : "bg-[#272424]"}`}>{m.message}</span>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>

                <form onSubmit={sendMessage} className="flex p-3 border-t border-[#242424]">
                    <input type="text" placeholder="Message"
                    className="w-full py-2 pl-4 mx-3 border border-[#242424] focus:outline-none bg-[#1b1b1b] rounded-full text-white"
                    name="message" value={message} onChange={e => setMessage(e.target.value)} required />
                    <button type="submit">
                        <svg className="h-5 text-gray-500 rotate-90" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20" fill="currentColor">
                            <path
                            d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    )
}
// 343145
export default ChatPage