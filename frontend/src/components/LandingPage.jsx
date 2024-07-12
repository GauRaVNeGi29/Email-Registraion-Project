import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SearchComponent from './SearchComponent';

function LandingPage() {
  const navigate = useNavigate()
  axios.defaults.withCredentials = true; 
  const handleLogout = async ()=>{
    try {
      const res = await axios.get('http://localhost:3000/auth/logout', { withCredentials: true });
      if (res.data.status) {
        navigate('/login');
      } else {
        console.error('Logout failed: ', res.data.message);
      }
    } catch (err) {
      if (err.response) {
        // The request was made and the server responded with a status code that falls out of the range of 2xx
        console.error('Server responded with an error: ', err.response.data);
      } else if (err.request) {
        // The request was made but no response was received
        console.error('No response received from the server: ', err.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error in setting up the request: ', err.message);
      }
      console.error('Axios error: ', err.config);
    }
  }

  return (
    <div>
      <SearchComponent />
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <section className="relative py-10 sm:py-16 lg:py-24 w-full max-w-lg">
        <div className="relative px-4 sm:px-0 mx-auto">
          <div className="overflow-hidden bg-white rounded-md shadow-md">
            <div className="px-4 py-6 sm:px-8 sm:py-7">
              {/* <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900">Candidate Dashboard</h2>
                <p className="mt-2 text-base text-gray-600">Navigate to Home or Log Out</p>
              </div> */}

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
