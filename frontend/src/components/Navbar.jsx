import React, {useContext} from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { UserContext } from '../context/UserContext'

export default function Navbar() {

  const {logout,currentUser} = useContext(UserContext) 

  console.log("Current User: ", currentUser);


  return (
    <div>
      {/* Top Navbar with Logo */}
      <nav className="bg-transparent border-gray-200">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="./images/logo.jpeg" className="h-12" alt="Logo" /> {/* Increased height of the logo */}
            <span className="self-center text-4xl font-semibold whitespace-nowrap text-white">Royal Betting </span> {/* Larger text and white color */}
          </div>
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <Link to="/" className="text-white text-lg hover:text-black hover:underline underline-black">Home</Link>
            <Link to="/login" className="text-white text-lg hover:text-black hover:underline underline-black">Login</Link>
            <Link to="/register" className="text-white text-lg hover:text-black hover:underline underline-black">Register</Link>
            <Link to="/placebet" className="text-white text-lg hover:text-black hover:underline underline-black">Place Bet</Link>
            <Link to="/profile" className="text-white text-lg hover:text-black hover:underline underline-black">Profile</Link>
            <Link to="/about" className="text-white text-lg hover:text-black hover:underline underline-black">About</Link>
            {/* <Link onClick={() => logout()} className="text-white text-lg hover:text-black hover:underline underline-black">Logout</Link> */}
            {currentUser ? (
              <Link
                onClick={() => logout()} // Trigger the logout function
                className="text-white text-lg hover:text-black hover:underline underline-black"
              >
                Logout
              </Link>
            ) : null}
          </div>
        </div>
      </nav>
    </div>
  );
}
