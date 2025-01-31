// import { Link } from 'react-router-dom';
// import React, { useState,useContext } from 'react';

// import { UserContext } from '../context/UserContext';

// const RegisterForm = () => {

//   const {addUser} = useContext(UserContext)
  
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [repeatPassword, setRepeatPassword] = useState('');


//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (password != repeatPassword){
//         alert("Password does not match")
//     }

//     addUser(username,email,password)

//     console.log("Username", username)

//     console.log("Email", email)

//     console.log("Password", password)

//     console.log("Repeat Password", repeatPassword)
//   };

//   return (
//     <div className="min-h-screen bg-black text-white">
//       {/* Navbar */}
//       <nav className="bg-red-600 py-4 px-6 shadow-md">
//         <div className="container mx-auto flex justify-between items-center">
//           <h1 className="text-2xl font-bold text-white">Betting Management</h1>
//           <ul className="flex space-x-6">
//             <li>
//               <a href="/" className="text-white hover:text-gray-200">Home</a>
//             </li>
//             <li>
//               <a href="/login" className="text-white hover:text-gray-200">Login</a>
//             </li>
//             <li>
//               <a href="/register" className="text-white hover:text-gray-200">Register</a>
//             </li>
//           </ul>
//         </div>
//       </nav>

//       {/* Register Form */}
//       <div className="flex justify-center items-center min-h-screen bg-black">
//         <form
//           onSubmit={handleSubmit}
//           className="bg-red-600 p-8 rounded-xl shadow-lg w-96 mt-16"
//         >
//           <h2 className="text-3xl font-bold text-center mb-6">Register</h2>

//           {/* Username */}
//           <input
//             type="text"
//             name="username"
//             placeholder="Enter Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//             className="w-full p-3 mb-4 bg-black text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
//           />

//           {/* Email */}
//           <input
//             type="email"
//             name="email"
//             placeholder="Enter Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className="w-full p-3 mb-4 bg-black text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
//           />

//           {/* Password */}
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             className="w-full p-3 mb-4 bg-black text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
//           />

//           {/* Repeat Password */}
//           <input
//             type="password"
//             name="repeatPassword"
//             placeholder="Repeat Password"
//             value={repeatPassword}
//             onChange={(e) => setRepeatPassword(e.target.value)}
//             required
//             className="w-full p-3 mb-6 bg-black text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
//           />

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full py-3 bg-red-700 text-white font-bold rounded-md hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-400"
//           >
//             Sign Up
//           </button>

//           {/* Login Link */}
//           <p className="text-center text-sm mt-4">
//             Already have an account?{' '}
//             <Link to ="/login" className="text-red-400 hover:underline">
//               Login
//             </Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default RegisterForm;

import { Link } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';

const RegisterForm = () => {

  const { addUser } = useContext(UserContext);
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure password matches
    if (password !== repeatPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Call addUser function from context to send the registration request
    addUser(username, email, password);

    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Repeat Password:", repeatPassword);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="bg-red-600 py-4 px-6 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Betting Management</h1>
          <ul className="flex space-x-6">
            <li><a href="/" className="text-white hover:text-gray-200">Home</a></li>
            <li><a href="/login" className="text-white hover:text-gray-200">Login</a></li>
            <li><a href="/register" className="text-white hover:text-gray-200">Register</a></li>
          </ul>
        </div>
      </nav>

      {/* Register Form */}
      <div className="flex justify-center items-center min-h-screen bg-black">
        <form
          onSubmit={handleSubmit}
          className="bg-red-600 p-8 rounded-xl shadow-lg w-96 mt-16"
        >
          <h2 className="text-3xl font-bold text-center mb-6">Register</h2>

          {/* Username */}
          <input
            type="text"
            name="username"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full p-3 mb-4 bg-black text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 mb-4 bg-black text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 mb-4 bg-black text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
          />

          {/* Repeat Password */}
          <input
            type="password"
            name="repeatPassword"
            placeholder="Repeat Password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            required
            className="w-full p-3 mb-6 bg-black text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-red-700 text-white font-bold rounded-md hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Sign Up
          </button>

          {/* Login Link */}
          <p className="text-center text-sm mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-red-400 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;

