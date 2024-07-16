import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const ResetPassword = () => {

    const [password, setPassword] = useState('')
    const {token} = useParams()

    const api = import.meta.env.VITE_BACKEND_URL



    const navigate = useNavigate()

    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     axios.post(`${api}/auth/reset-password/`+token, {
    //         password
    //     }).then(response => {
    //         if (response.data.status) {
    //             navigate("/login")
    //         }
    //         console.log(response.data)
    //     }).catch(err => {
    //         console.log(err);
    //     })
    // };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
          const response = await axios.post(`${api}/auth/reset-password/`+token,
            password,
            {
            headers:{
              "Content-Type":"application/json",
            },
            withCredentials:true,
            }
          )
          if(response.data.status){
            navigate("/login");
          }
          console.log(response.data);
        } catch (error) {
          console.log(error);
          
        }
      }

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <section className="relative py-10 sm:py-16 lg:py-24 w-full max-w-lg">
                <div className="relative px-4 sm:px-0 mx-auto">
                    <div className="overflow-hidden bg-white rounded-md shadow-md">
                        <div className="px-4 py-6 sm:px-8 sm:py-7">
                            <div className="text-center">
                                <h2 className="text-3xl font-bold text-gray-900">Reset Password</h2>
                                <p className="mt-2 text-base text-gray-600">Enter your new password</p>
                            </div>

                            <form onSubmit={handleSubmit} className="mt-8">
                                <div className="space-y-5">
                                    <div>
                                        <label htmlFor="password" className="text-base font-medium text-gray-900">New Password</label>
                                        <div className="mt-2.5">
                                            <input
                                                type="password"
                                                name="password"
                                                id="password"
                                                placeholder="Enter your new password"
                                                className="block w-full p-4 text-black placeholder-gray-500 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700">
                                            Reset Password
                                        </button>
                                    </div>
                                </div>
                            </form>

                            <div className="text-center">
                                <p className="mt-2 text-base text-gray-600">
                                    Remember your password? <a href="/login" className="text-blue-600 hover:underline hover:text-blue-700">Login</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ResetPassword
