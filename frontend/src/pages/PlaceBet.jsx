import React, { useContext, useState, useEffect } from 'react';
import { BetContext } from '../context/BetContext';

export default function PlaceBet() {
  const { bets, placeBet } = useContext(BetContext);  // Fetch bets from context

  const [matches, setMatches] = useState([]);  // Store the matches in state
  const [users, setUsers] = useState([]);  // Store users in state
  const [match_id, setMatchId] = useState('');
  const [user_id, setUserId] = useState('');
  const [amount, setAmount] = useState('');
  const [bet_date, setBetDate] = useState('');
  const [outcome, setOutcome] = useState('');

  // Fetch matches when component mounts
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch('http://localhost:5000/matches');  // Adjust URL based on your Flask server
        if (response.ok) {
          const data = await response.json();
          setMatches(data);  // Set the matches in the state
        } else {
          console.error('Failed to fetch matches');
        }
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
    };

    fetchMatches();  // Call the function to fetch matches
  }, []);

  // Fetch users when component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/users/fetch_users');  // Adjust URL for users API
        if (response.ok) {
          const data = await response.json();
          setUsers(data);  // Set the users in the state
        } else {
          console.error('Failed to fetch users');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();  // Call the function to fetch users
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Make sure all fields are filled before calling placeBet
    if (match_id && user_id && amount && bet_date && outcome) {
      placeBet(match_id, outcome, amount, bet_date, user_id);  // Place the bet with selected match_id
    } else {
      console.error('All fields must be filled!');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-semibold text-black mb-6">Place a Bet</h2>
      <form onSubmit={handleSubmit} className="space-y-6">

        <div>
          <label className="text-gray-600 text-sm mb-2 block">Select User</label>
          <select
            value={user_id}
            onChange={(e) => setUserId(e.target.value)}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black"
            required
          >
            <option value="">Select User</option>
            {users.length > 0 ? (
              users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.username}
                </option>
              ))
            ) : (
              <option value="">No users available</option>
            )}
          </select>
        </div>

        <div>
          <label className="text-gray-600 text-sm mb-2 block">Select Match</label>
          <select
            value={match_id}
            onChange={(e) => setMatchId(e.target.value)}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black"
            required
          >
            <option value="">Select Match</option>
            {matches.length > 0 ? (
              matches.map((match) => (
                <option key={match.id} value={match.id}>
                  {match.name} - {match.odds_team_a} vs {match.odds_team_b}
                </option>
              ))
            ) : (
              <option value="">No matches available</option>
            )}
          </select>
        </div>

        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-black">
            Bet Amount
          </label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black"
            required
          />
        </div>

        <div>
          <label htmlFor="bet_date" className="block text-sm font-medium text-black">
            Bet Date
          </label>
          <input
            id="bet_date"
            type="date"
            value={bet_date}
            onChange={(e) => setBetDate(e.target.value)}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black"
            required
          />
        </div>

        <div>
          <label htmlFor="outcome" className="block text-sm font-medium text-black">
            Outcome
          </label>
          <select
            id="outcome"
            value={outcome}
            onChange={(e) => setOutcome(e.target.value)}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black"
            required
          >
            <option value="">Select Outcome</option>
            <option value="win">Team_A_win</option>
            <option value="lose">Team_B_win</option>
          </select>
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Place Bet
          </button>
        </div>
      </form>
    </div>
  );
}

