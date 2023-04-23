import React, {useState} from 'react'
import {useNavigate} from "react-router-dom"

const Home = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        sessionStorage.setItem("userName", username)
        navigate("/chat")
    }
    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 bg-[#1b1b1b]">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Sign In
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                            <input type="username" name="username" id="username" value={username} onChange={e => setUsername(e.target.value)} minLength={3} maxLength={30} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-zinc-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>
                        <button type="submit" className="border-2 border-slate-600 w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign In</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
// 161819

export default Home