import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BetContext } from '../context/BetContext'; // Import BetContext

export default function SingleBet() {
  const { id } = useParams();  // Get bet ID from URL
  const { bets, deleteBet } = useContext(BetContext);  // Get bets and deleteBet from context
  const [bet, setBet] = useState(null);  // State to hold the single bet data

  // Fetch the specific bet details using the bet ID
  useEffect(() => {
    if (bets && Array.isArray(bets)) {
      const singleBet = bets.find(bet => bet.id == id);  // Find bet by ID
      setBet(singleBet);  // Set the found bet into the state
    }
  }, [bets, id]);  // Re-run when bets or id changes

  return (
    <div className="bg-black text-white p-6 rounded-lg shadow-lg max-w-xl mx-auto">
      {
        !bet ? (
          <div className="text-center text-lg text-red-500">Bet not found</div>
        ) : (
          <div className="flex flex-col gap-6">
            {/* Delete Button */}



             

            {/* Amount and Bet Date */}
            <div className="mt-4 text-center">
              <h1 className="bg-red-600 text-white py-2 px-4 rounded-md mb-2">{bet.match_name}</h1>
              <p className="bg-red-600 text-white py-2 px-4 rounded-md mb-2"><strong>Winning team: </strong> {bet.outcome}</p>
              <p className="bg-red-600 text-white py-2 px-4 rounded-md mb-2"><strong>Team you betted on:</strong> {bet.outcome}</p>
              <p className="bg-red-600 text-white py-2 px-4 rounded-md mb-2"><strong>Amount Betted: </strong>${bet.amount}</p>
              <p className="bg-red-600 text-white py-2 px-4 rounded-md mb-2"><strong>Date of Bet: </strong>{new Date(bet.bet_date).toLocaleDateString()}</p>
              <p className="bg-red-600 text-white py-2 px-4 rounded-md mb-2">
              <strong>Time of Betting: </strong>{new Date(bet.bet_date).toLocaleString()}
              </p>

            </div>

                     {/* Delete Button */}
            <div className="flex items-center justify-between">
              <span 
                onClick={(e) => {
                  e.stopPropagation();
                  deleteBet(bet.id);  // Prevent link navigation when deleting
                }} 
                className="bg-red-600 px-4 py-2 rounded-full cursor-pointer hover:bg-red-500 transition-all w-full text-center">
                Delete
              </span>

            </div>


          </div>

          
        )
      }
    </div>
  );
}

