import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SearchComponent from './SearchComponent';

function LandingPage() {
  const navigate = useNavigate()
  axios.defaults.withCredentials = true;

  const handleLogout = async (e) =>{
    axios.get('http://localhost:3001/auth/logout')
    .then(res=>{
      if(res.data.status){
        navigate('/login')
      }
    }).catch(err=>{
      console.log(err);
    })
  }

  return (
    <div>
      <SearchComponent />
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <section className="relative py-10 sm:py-16 lg:py-24 w-full max-w-lg">
        <div className="relative px-4 sm:px-0 mx-auto">
          <div className="overflow-hidden bg-white rounded-md shadow-md">
            <div className="px-4 py-6 sm:px-8 sm:py-7">

              <div className="mt-8 space-y-5">
                <div>
                  <Link to="/candidate/home">
                  <button 
                    className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700"
                  >
                    Candidate Home
                  </button>
                    </Link>
                </div>

                <div>
                  <button 
                    className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white bg-red-600 border border-transparent rounded-md focus:outline-none hover:bg-red-700 focus:bg-red-700"
                  onClick={handleLogout}>
                    Log Out
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
    </div>
  );
}

export default LandingPage;
