import React, { createContext, useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { UserContext } from "./UserContext";

// Create BetContext
export const BetContext = createContext();

export const BetProvider = ({ children }) => {
  const { authToken } = useContext(UserContext);
  const [bets, setBets] = useState([]);
  
  // Fetch bets when authToken or other dependencies change
  useEffect(() => {
    if (authToken) {
      fetch('http://127.0.0.1:5000/bets', {
        method: "GET",
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      })
        .then((response) => response.json())
        .then((response) => {
          setBets(response);
        })
        .catch((error) => {
          console.error("Error fetching bets:", error);
        });
    }
  }, [authToken]);

  // Place a bet
  const placeBet = (amount, outcome, match_id, bet_date, user_id) => {
    fetch("http://127.0.0.1:5000/bets/place_bet", {
      method: "POST",
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ amount, outcome, match_id, bet_date, user_id }),
    })
      .then((resp) => resp.json())
      .then((response) => {
        if (response.success) {
          toast.success(response.success);
        } else if (response.error) {
          toast.error(response.error);
        } else {
          toast.error("Failed to add");
        }
      })
      .catch((error) => {
        console.error("Error placing bet:", error);
        toast.error("An error occurred");
      });
  };

  // Delete a bet
  const deleteBet = (id) => {
    fetch(`http://127.0.0.1:5000/bets/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((resp) => resp.json())
      .then((response) => {
        if (response.message) {
          toast.success(response.message);
          setBets((prevBets) => prevBets.filter((bet) => bet.id !== id));
        } else {
          toast.error("Failed to delete");
        }
      })
      .catch((error) => {
        console.error("Error deleting bet:", error);
        toast.error("An error occurred");
      });
  };

  return (
    <BetContext.Provider value={{ bets, placeBet, deleteBet }}>
      {children}
    </BetContext.Provider>
  );
};
