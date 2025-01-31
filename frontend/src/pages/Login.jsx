import React, { useState, useContext } from 'react'; // Import useContext
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext'; 

export default function Login() {
    
    const { login } = useContext(UserContext); // Use useContext to access login

    // Declare state variables for email and password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); 

        // Call login function from context
        login(email, password);
    };

  return (
    <div>
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        {/* Email Field */}
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
          <input 
            type="text" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="name@gmail.com" 
            required 
          />
        </div>

        {/* Password Field */}
        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}  
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            required 
          />
        </div>

        {/* Remember Me Checkbox */}
        <div className="flex items-start mb-5">
          <div className="flex items-center h-5">
            <input 
              id="remember" 
              type="checkbox" 
              value="" 
              className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" 
              required 
            />
          </div>
          <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          className="text-red-500 bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Submit
        </button>

        {/* Register Link */}
        <p className="text-center text-sm mt-4 text-gray-300">
          Do not have an account?{' '}
          <Link to="/register" className="text-red-400 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}


        
    