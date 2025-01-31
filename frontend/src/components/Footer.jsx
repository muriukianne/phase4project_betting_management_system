import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-black rounded-lg shadow-sm m-4 p-2">
        <div className="w-full max-w-screen-xl mx-auto p-2 md:py-4">
            <div className="sm:flex sm:items-center sm:justify-between">
                <a href="https://flowbite.com/" className="flex items-center mb-2 sm:mb-0 space-x-3 rtl:space-x-reverse">
                    <img src="./images/logo.jpeg" className="h-6" alt="Royal Betting Logo" /> {/* Reduced logo size */}
                    <span className="self-center text-xl font-semibold whitespace-nowrap text-white">Royal Betting Management System</span> {/* Reduced text size */}
                </a>
                <ul className="flex flex-wrap items-center mb-4 text-xs font-medium text-gray-300 sm:mb-0">
                    <li>
                        <a href="#" className="hover:underline me-4 md:me-6 text-white">About</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline me-4 md:me-6 text-white">Licensing</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline text-white">Contact</a>
                    </li>
                </ul>
            </div>
            <hr className="my-4 border-gray-600 sm:mx-auto lg:my-6" /> {/* Reduced margin */}
            <span className="block text-xs text-gray-300 sm:text-center">©2025. All Rights Reserved.</span> {/* Reduced text size */}
        </div>
    </footer>
  );
}
