import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';

export default function ProfilePage() {
  const { currentUser, updateUser, deleteUser } = useContext(UserContext);

  // States for transaction and profile update
  const [userData, setUserData] = useState(null);
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionError, setTransactionError] = useState("");
  const [transactionSuccess, setTransactionSuccess] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  // Fetch user data from backend on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://phase4project-betting-management-system.onrender.com/users/single_user/${currentUser.id}`);
        const data = await response.json();
        if (response.ok) {
          setUserData(data);
          setNewUsername(data.username);
          setNewEmail(data.email);
        } else {
          console.error('Error fetching user data:', data.Error);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    if (currentUser && currentUser.id) {
      fetchUserData();
    }
  }, [currentUser]);

  // Handle Profile Update
  const handleUpdateClick = () => {
    setIsUpdating(!isUpdating);
  };

  const handleUpdateSubmit = () => {
    if (!newUsername || !newEmail) {
      alert("Please fill in all fields");
      return;
    }
    const updatedData = { username: newUsername, email: newEmail };
    
    updateUser(currentUser.id, updatedData);
    
    // Optimistically update userData
    setUserData((prevData) => ({
      ...prevData,
      username: newUsername,
      email: newEmail,
    }));

    setIsUpdating(false);
  };

  // Handle Delete Account
  const handleDeleteClick = () => {
    setIsConfirmingDelete(true);
  };

  const confirmDelete = () => {
    if (currentUser && currentUser.id) {
      deleteUser(currentUser.id);
    }
    setIsConfirmingDelete(false);
  };

  const cancelDelete = () => {
    setIsConfirmingDelete(false);
  };

  // Handle Deposit/Withdraw
  const handleTransaction = async (transactionType) => {
    if (transactionAmount <= 0) {
      setTransactionError(`Please enter a valid ${transactionType} amount.`);
      return;
    }

    if (transactionType === 'withdrawal' && transactionAmount > userData.balance) {
      setTransactionError("Insufficient balance.");
      return;
    }

    try {
      const response = await fetch('https://phase4project-betting-management-system.onrender.com/transactions/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: currentUser.id,
          amount: transactionAmount,
          transaction_type: transactionType,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        // Update userData balance optimistically
        const updatedBalance = transactionType === 'deposit'
          ? userData.balance + transactionAmount
          : userData.balance - transactionAmount;

        setUserData((prevData) => ({
          ...prevData,
          balance: updatedBalance,
        }));

        setTransactionSuccess(`${transactionType.charAt(0).toUpperCase() + transactionType.slice(1)} successful!`);
        setTransactionError(""); // Clear any previous errors
        setTransactionAmount(0); // Reset input field
      } else {
        setTransactionError(data.Error || `An error occurred while processing the ${transactionType}.`);
      }
    } catch (error) {
      setTransactionError(`An error occurred while processing your ${transactionType}.`);
    }
  };

  return (
    <>
      {userData ? (
        <div className="max-w-4xl mx-auto p-6 bg-black text-white shadow-lg rounded-lg mt-10">
          <h2 className="text-3xl font-semibold text-red-600 mb-6">Profile</h2>

          {/* Profile Information */}
          <div className="space-y-6">
            <div className="flex justify-between">
              <h3 className="text-xl font-medium text-gray-400">Username</h3>
              <p className="text-white">{userData.username}</p>
            </div>

            <div className="flex justify-between">
              <h3 className="text-xl font-medium text-gray-400">Email</h3>
              <p className="text-white">{userData.email}</p>
            </div>

            <div className="flex justify-between">
              <h3 className="text-xl font-medium text-gray-400">Balance</h3>
              <p className="text-white">${userData.balance}</p>
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

          {/* Transaction Buttons */}
          <div className="mt-6 flex justify-between gap-4">
            <button
              onClick={() => handleTransaction('deposit')}
              className="px-6 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
              Deposit
            </button>

            <button
              onClick={() => handleTransaction('withdrawal')}
              className="px-6 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
              Withdraw
            </button>
          </div>

          {/* Update Profile Section */}
          {isUpdating && (
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
                className="mt-4 px-6 py-2 bg-green-800 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                Submit Update
              </button>
            </div>
          )}

          {/* Update Profile and Delete Account Buttons */}
          <div className="mt-6 flex justify-between gap-4">
            <button
              onClick={handleUpdateClick}
              className="px-6 py-2 bg-red-800 text-white font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
              {isUpdating ? "Cancel" : "Update Profile"}
            </button>

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
      ) : (
        <p>Loading user data...</p>
      )}
    </>
  );
}
