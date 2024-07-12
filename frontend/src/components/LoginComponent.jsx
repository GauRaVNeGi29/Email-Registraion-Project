import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginComponent() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const api = import.meta.env.VITE_BACKEND_URL


  // const xhr = new XMLHttpRequest();
  // xhr.withCredentials = true;
  // xhr.open('POST', 'http://localhost:3000/auth/login', true);
  // xhr.send();

  // axios.defaults.withCredentials = true; 

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      const response = await axios.post(`${api}/auth/login`,
        {email ,password},
        {
        headers:{
          "Content-Type":"application/json",
        },
        withCredentials:true,
        }
      )
      if(response.data.status){
        navigate("/");
      }
      else{
        console.log("data is not found")
      }
      
    } catch (error) {
      console.log(error);
      
    }
    // axios.post('http://localhost:3000/auth/login', {
    //   email,
    //   password
    // }).then(response => {
    //   if (response.data.status) {
    //     navigate("/");
    //   }
    // }).catch(err => {
    //   console.log(err);
    // });
  }

  return (
    <section className="relative py-10 bg-gray-900 sm:py-16 lg:py-24">
      <div className="relative max-w-lg px-4 mx-auto sm:px-0">
        <div className="overflow-hidden bg-white rounded-md shadow-md">
          <div className="px-4 py-6 sm:px-8 sm:py-7">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900"> Welcome Back! </h2>
              <p className="mt-2 text-base text-gray-600">
                Login to your account</p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8">
              <div className="space-y-5">
                <div>
                  <label htmlFor="email" className="text-base font-medium text-gray-900"> Email </label>
                  <div className="mt-2.5">
                    <input type="email" name="email" id="email" placeholder="Enter your email" className="block w-full p-4 text-black placeholder-gray-500 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                    onChange={(e) => setEmail(e.target.value)} />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="text-base font-medium text-gray-900"> Password </label>
                  <div className="mt-2.5">
                    <input type="password" name="password" id="password" placeholder="Enter your password" className="block w-full p-4 text-black placeholder-gray-500 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                    onChange={(e) => setPassword(e.target.value)} />
                  </div>
                </div>
              <p className="mt-2 text-base text-gray-600">
              <a href="/forgot-password" className="text-blue-600 hover:underline hover:text-blue-700">Forgot password?</a>
              </p>

                <div>
                  <button type="submit" className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700">Login</button>
                </div>
              </div>
            </form>
            <div className="text-center">
              <p className="mt-2 text-base text-gray-600">
                Don't have an account? <a href="/signup" className="text-blue-600 hover:underline hover:text-blue-700">Create an account</a>
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>

  );
}

export default LoginComponent;

