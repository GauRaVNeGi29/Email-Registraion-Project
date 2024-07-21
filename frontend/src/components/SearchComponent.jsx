import React from 'react';
import { Link } from 'react-router-dom';

const SearchComponent = () => {
  return (
    <header className="relative py-4 bg-gray-900 sm:py-6 lg:py-8">
      <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-3xl font-bold text-white">Home</Link>
        <div className="flex-grow mx-4">
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full p-3 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600"
          />
        </div>
        <nav className="flex items-center space-x-4">
          <Link to="/login" className="text-base font-medium text-white hover:text-blue-500 transition-all duration-200">Login</Link>
          <Link to="/signup" className="text-base font-medium text-white hover:text-blue-500 transition-all duration-200">Signup</Link>
        </nav>
      </div>
    </header>
  );
}

export default SearchComponent;
