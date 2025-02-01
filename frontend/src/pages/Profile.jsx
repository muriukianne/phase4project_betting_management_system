import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';

export default function ProfilePage() {
  const { currentUser, updateUser, deleteUser } = useContext(UserContext);
  
  // State to handle deposit/withdraw input and errors
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionError, setTransactionError] = useState("");
  const [transactionSuccess, setTransactionSuccess] = useState("");

  // State to manage updating user profile
  const [isUpdating, setIsUpdating] = useState(false);
  const [newUsername, setNewUsername] = useState(currentUser ? currentUser.username : '');
  const [newEmail, setNewEmail] = useState(currentUser ? currentUser.email : '');

  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  // Handle the update button click to toggle the update form
  const handleUpdateClick = () => {
    setIsUpdating(!isUpdating); // Toggle the form visibility
  };

  // Handle the profile update submit
  const handleUpdateSubmit = () => {
    // Ensure the new username and email are not empty
    if (!newUsername || !newEmail) {
      alert("Please fill in all fields");
      return;
    }

    // Call updateUser function from context to update user profile
    const updatedData = {
      username: newUsername,
      email: newEmail,
    };

    updateUser(currentUser.id, updatedData); // Update the user data
    setIsUpdating(false); // Close the update form
  };

  // Handle the delete account button click
  const handleDeleteClick = () => {
    // Show confirmation modal
    setIsConfirmingDelete(true);
  };

  // Handle the confirmation of delete action
  const confirmDelete = () => {
    if (currentUser && currentUser.id) {
      deleteUser(currentUser.id);  // Use currentUser.id here
    }
    setIsConfirmingDelete(false); // Close confirmation modal
  };

  // Handle cancel delete action
  const cancelDelete = () => {
    setIsConfirmingDelete(false); // Close confirmation modal
  };

  // Handle the deposit action
  const handleDeposit = async () => {
    if (transactionAmount <= 0) {
      setTransactionError("Please enter a valid deposit amount.");
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/transactions/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: currentUser.id,
          amount: transactionAmount,
          transaction_type: 'deposit',
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setTransactionSuccess("Deposit successful!");
        setTransactionError(""); // Clear any previous errors
        setTransactionAmount(0); // Reset the input field
      } else {
        setTransactionError(data.Error || "An error occurred while processing the deposit.");
      }
    } catch (error) {
      setTransactionError("An error occurred while processing your request.");
    }
  };

  // Handle the withdraw action
  const handleWithdraw = async () => {
    if (transactionAmount <= 0) {
      setTransactionError("Please enter a valid withdrawal amount.");
      return;
    }

    if (transactionAmount > currentUser.balance) {
      setTransactionError("Insufficient balance.");
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/transactions/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: currentUser.id,
          amount: transactionAmount,
          transaction_type: 'withdrawal',
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setTransactionSuccess("Withdrawal successful!");
        setTransactionError(""); // Clear any previous errors
        setTransactionAmount(0); // Reset the input field
      } else {
        setTransactionError(data.Error || "An error occurred while processing the withdrawal.");
      }
    } catch (error) {
      setTransactionError("An error occurred while processing your request.");
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

            {/* Balance */}
            <div className="flex justify-between">
              <h3 className="text-xl font-medium text-gray-400">Balance</h3>
              <p className="text-white">${currentUser.balance}</p>
            </div>

            {/* Transaction Amount Input */}
            <div className="flex flex-col mt-4">
              <label className="text-xl text-gray-400">Transaction Amount</label>
              <input 
                type="number" 
                value={transactionAmount}
                onChange={(e) => setTransactionAmount(Number(e.target.value))}
                className="px-4 py-2 rounded-md bg-gray-800 text-white mt-2"
                min="0"
              />
            </div>
          </div>

          {/* Transaction Errors or Success Messages */}
          {transactionError && <p className="text-red-500 mt-2">{transactionError}</p>}
          {transactionSuccess && <p className="text-green-500 mt-2">{transactionSuccess}</p>}

          {/* Transaction Buttons (Now Red and White) */}
          <div className="mt-6 flex justify-between gap-4">
            <button 
              onClick={handleDeposit} 
              className="px-6 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
              Deposit
            </button>

            <button 
              onClick={handleWithdraw} 
              className="px-6 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
              Withdraw
            </button>
          </div>

          {/* Update Profile Section */}
          {isUpdating ? (
            <div className="mt-6 space-y-4">
              <div className="flex justify-between">
                <label className="text-xl text-gray-400">New Username</label>
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className="px-4 py-2 rounded-md bg-gray-800 text-white"
                />
              </div>
              <div className="flex justify-between">
                <label className="text-xl text-gray-400">New Email</label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="px-4 py-2 rounded-md bg-gray-800 text-white"
                />
              </div>
              <button
                onClick={handleUpdateSubmit}
                className="mt-4 px-6 py-2 bg-green-800 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Submit Update
              </button>
            </div>
          ) : null}

          {/* Update Profile Button */}
          <div className="mt-6 flex justify-between gap-4">
            <button 
              onClick={handleUpdateClick} 
              className="px-6 py-2 bg-red-800 text-white font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
              {isUpdating ? "Cancel" : "Update Profile"}
            </button>

            {/* Delete Account Button */}
            <button 
              onClick={handleDeleteClick} 
              className="px-6 py-2 bg-red-800 text-white font-medium rounded-md hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
              Delete Account
            </button>
          </div>

          {/* Confirmation Modal */}
          {isConfirmingDelete && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
              <div className="bg-black text-white p-6 rounded-lg shadow-lg">
                <p>Are you sure you want to delete your account? This action is irreversible.</p>
                <div className="mt-4 flex justify-between gap-4">
                  <button 
                    onClick={confirmDelete} 
                    className="px-6 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700">
                    Yes, Delete
                  </button>
                  <button 
                    onClick={cancelDelete} 
                    className="px-6 py-2 bg-gray-600 text-white font-medium rounded-md hover:bg-gray-700">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      }
    </>
  );
}
