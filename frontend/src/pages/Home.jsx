import React, { useContext, useState } from 'react';
import { BetContext } from '../context/BetContext'; 
import { UserContext } from '../context/UserContext'; 
import { Link } from 'react-router-dom';

export default function Home() {
  const { currentUser } = useContext(UserContext);
  const { bets, deleteBet } = useContext(BetContext);
  console.log(bets);

  return (
    <div>
      {currentUser ? (
        <div>
          <h1 className='my-3 text-xl font-bold'>
            Your Bets - {Array.isArray(bets) ? bets.length : 0}
          </h1>

          {bets && bets.length < 1 && (
            <div>
              You haven't placed any bets yet.
              <Link to="/placebet" className="text-blue-600">
                Place a Bet
              </Link>
            </div>
          )}

          <div className='flex flex-col gap-4'>
            {Array.isArray(bets) && bets.length > 0 ? (
              bets.map((bet) => (
                <div key={bet.id} className='border-4 border-red-500 p-4 rounded-lg'>
                  <div className='flex items-center justify-between mb-3'>
                    <p className='text-right text-xs'>
                      {new Date(bet.bet_date).toLocaleString()}
                    </p>
                  </div>

                  {/* Display the match name */}
                  <Link to={`/bet/${bet.id}`} className='font-semibold text-white'>
                    {bet.match_name}
                  </Link>

                  <div className='flex justify-between items-center mt-3'>
                    <Link
                      to={`/bet/${bet.id}`}
                      className='px-2 py-1 bg-white text-black'
                    >
                      {bet.outcome}
                    </Link>
                    <span
                      onClick={() => deleteBet(bet.id)}
                      className='bg-red-600 px-1 text-white hover:cursor-pointer hover:bg-red-300'
                    >
                      Delete
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-white">No bets available</div>
            )}
          </div>
        </div>
      ) : (
        <div className='text-center'>
          <div className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50">
            <Link to="/login" className="font-medium">Login</Link> to access this page.
          </div>
        </div>
      )}
    </div>
  );
}
