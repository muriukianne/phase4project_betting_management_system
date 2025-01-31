// // import React from 'react'

// // export default function Profile() {
// //   return (
// //     <div>Profile</div>
// //   )
// // }

// import React, { useContext } from 'react';
// import { UserContext } from '../context/UserContext';

// export default function ProfilePage() {
//   const { currentUser, updateUser, deleteUser } = useContext(UserContext);

//   // Handle the update button click
//   const handleUpdateClick = () => {
//     // You can implement the logic to update user info, 
//     // like opening a modal or a form for changing username or email.
//     alert("Update Profile logic goes here.");
//   };

//   // Handle the delete account button click
//   const handleDeleteClick = () => {
//     if (window.confirm("Are you sure you want to delete your account? This action is irreversible.")) {
//       deleteUser(currentUser.id);  // Pass user id to delete
//     }
//   };

//   return (
//     <>
//       {
//         !currentUser ? "Not authorized" :
//         <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
//           <h2 className="text-3xl font-semibold text-gray-700 mb-6">Profile</h2>

//           {/* Profile Information */}
//           <div className="space-y-6">
//             {/* Username */}
//             <div className="flex justify-between">
//               <h3 className="text-xl font-medium text-gray-600">Username</h3>
//               <p className="text-gray-800">{currentUser.username}</p>
//             </div>

//             {/* Email */}
//             <div className="flex justify-between">
//               <h3 className="text-xl font-medium text-gray-600">Email</h3>
//               <p className="text-gray-800">{currentUser.email}</p>
//             </div>

//           </div>

//           {/* Update Profile Button */}
//           <div className="mt-6 flex justify-between gap-4">
//             <button 
//               onClick={handleUpdateClick} 
//               className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
//               Update Profile
//             </button>

//             {/* Delete Account Button */}
//             <button 
//               onClick={handleDeleteClick} 
//               className="px-6 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
//               Delete Account
//             </button>
//           </div>
//         </div>
//       }
//     </>
//   );
// }

import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';

export default function ProfilePage() {
  const { currentUser, updateUser, deleteUser } = useContext(UserContext);

  // Handle the update button click
  const handleUpdateClick = () => {
    // You can implement the logic to update user info, 
    // like opening a modal or a form for changing username or email.
    alert("Update Profile logic goes here.");
  };

  // Handle the delete account button click
  const handleDeleteClick = () => {
    if (window.confirm("Are you sure you want to delete your account? This action is irreversible.")) {
      deleteUser(currentUser.id);  // Pass user id to delete
    }
  };




  return (
    <>
      {
        !currentUser ? "Not authorized" :
        <div className="max-w-4xl mx-auto p-6 bg-black text-white shadow-lg rounded-lg mt-10">
          <h2 className="text-3xl font-semibold text-red-600 mb-6">Profile</h2>

          {/* Profile Information */}
          <div className="space-y-6">
            {/* Username */}
            <div className="flex justify-between">
              <h3 className="text-xl font-medium text-gray-400">Username</h3>
              <p className="text-white">{currentUser.username}</p>
            </div>

            {/* Email */}
            <div className="flex justify-between">
              <h3 className="text-xl font-medium text-gray-400">Email</h3>
              <p className="text-white">{currentUser.email}</p>
            </div>
          </div>

          {/* Update Profile Button */}
          <div className="mt-6 flex justify-between gap-4">
            <button 
              onClick={handleUpdateClick} 
              className="px-6 py-2 bg-red-800 text-white font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
              Update Profile
            </button>

            {/* Delete Account Button */}
            <button 
              onClick={handleDeleteClick} 
              className="px-6 py-2 bg-red-800 text-white font-medium rounded-md hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
              Delete Account
            </button>

          </div>
        </div>
      }
    </>
  );
}

