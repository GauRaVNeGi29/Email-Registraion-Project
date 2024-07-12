import React, { useEffect } from 'react';
import SearchComponent from './SearchComponent';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function CandidateHome() {
  const api = import.meta.env.VITE_BACKEND_URL
  const navigate = useNavigate()
  axios.defaults.withCredentials = true;
  useEffect(()=>{
    console.log(api);
    axios.get(`${api}/auth/verify`)
    .then(res=>{
      if(res.data.status){

      }else{
        navigate('/')
      }
    })
  })

  const referralCards = [
    { id: 1, title: 'Referral 1', description: 'Description for referral 1' },
    { id: 2, title: 'Referral 2', description: 'Description for referral 2' },
    { id: 3, title: 'Referral 3', description: 'Description for referral 3' },
  ];

  const serviceCards = [
    { id: 1, title: 'Service 1', description: 'Description for service 1' },
    { id: 2, title: 'Service 2', description: 'Description for service 2' },
    { id: 3, title: 'Service 3', description: 'Description for service 3' },
  ];

  return (
    <div>
      <SearchComponent/>
      <div className="min-h-screen bg-gray-900 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-6">Candidate Home</h1>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Referral Cards</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {referralCards.map(card => (
              <div key={card.id} className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                <p className="text-gray-700">{card.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white mb-4">Service Cards</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceCards.map(card => (
              <div key={card.id} className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                <p className="text-gray-700">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default CandidateHome;
