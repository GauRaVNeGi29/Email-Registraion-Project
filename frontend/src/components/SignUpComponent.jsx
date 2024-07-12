import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const SignUpComponent = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const api = import.meta.env.VITE_BACKEND_URL

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`${api}/auth/signup`, {
            username,
            email,
            password
        }).then(response => {
            if (response.data.status) {
                navigate("/login")
            }
        }).catch(err => {
            console.log(err);
        })
    };

    return (
        <section className="relative py-10 bg-gray-900 sm:py-16 lg:py-24">
            <div className="relative max-w-lg px-4 mx-auto sm:px-0">
                <div className="overflow-hidden bg-white rounded-md shadow-md">
                    <div className="px-4 py-6 sm:px-8 sm:py-7">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-gray-900">Create an account</h2>
                            <p className="mt-2 text-base text-gray-600">
                                Start a new journey
                            </p>
                        </div>

                        <form className="mt-8" onSubmit={handleSubmit}>
                            <div className="space-y-5">
                                <div>
                                    <label htmlFor="username" className="text-base font-medium text-gray-900"> Username </label>
                                    <div className="mt-2.5">
                                        <input type="text" id="username" placeholder="Enter your Username" className="block w-full p-4 text-black placeholder-gray-500 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                                            onChange={(e) => setUsername(e.target.value)} />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="email" className="text-base font-medium text-gray-900"> Email  </label>
                                    <div className="mt-2.5">
                                        <input type="email" id="email" placeholder="Enter your email " className="block w-full p-4 text-black placeholder-gray-500 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                                            onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="password" className="text-base font-medium text-gray-900"> Password </label>
                                    <div className="mt-2.5">
                                        <input type="password" id="password" placeholder="Enter your password" className="block w-full p-4 text-black placeholder-gray-500 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                                            onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                </div>

                                <div>
                                    <button type="submit" className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700">Sign up</button>
                                </div>
                            </div>
                        </form>
                        <div className="text-center">
                            <p className="mt-2 text-base text-gray-600">
                                Already joined? <a href="/login" title="" className="text-blue-600 hover:underline hover:text-blue-700">Login now</a>
                            </p>
                        </div>


                    </div>
                </div>
            </div>
        </section>
    )
}

export default SignUpComponent
