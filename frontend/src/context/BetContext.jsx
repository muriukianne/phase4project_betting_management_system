import React, { createContext, useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export const BetContext = createContext();

export const BetProvider = ({ children }) => {

  const navigate = useNavigate();
  const { authToken } = useContext(UserContext)

  const [bets, setBets] = useState([]);
  const [onChange, setOnChange] = useState(true)

  // MATCHES


  // Fetch all bets
  useEffect(() => {
    if (authToken) {  // Only fetch if authToken is available
      fetch('http://127.0.0.1:5000/bets', {
        method: "GET",
        headers: {
          'Content-type': 'application/json',
          Authorization:` Bearer ${authToken}`,
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
  }, [authToken, onChange]); 

  // Place a bet
  const placeBet = ( amount, outcome, match_id, bet_date, user_id) => {
    fetch("http://127.0.0.1:5000/bets/place_bet", {
      method: "POST",
      headers: {
       'Content-type': 'application/json',
        Authorization:` Bearer ${authToken}`,
      },
      body: JSON.stringify({
        amount,
        outcome,
        match_id,
        bet_date,
        user_id
      }),
    })
      .then((resp)=>resp.json())
      .then((response)=>{
        console.log(response);
        
        if(response.success){
            toast.dismiss()
            toast.success(response.success)
            // setOnChange(!onChange)
        }
        else if(response.error){
            toast.dismiss()
            toast.error(response.error)

        }
        else{
            toast.dismiss()
            toast.error("Failed to add")

        }
      
        
    })
  };

  // Update a bet
  // const updateBet = (betId, amount, outcome, matchId, userId) => {
  //   fetch(`https://your-flask-backend-url/bets/${betId}`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-type": "application/json",
  //       Authorization: `Bearer ${authToken}`,
  //     },
  //     body: JSON.stringify({
  //       amount,
  //       outcome,
  //       match_id: matchId,
  //       user_id: userId,
  //     }),
  //   })
  //     .then((resp) => resp.json())
  //     .then((response) => {
  //       if (response.message) {
  //         alert(response.message);
  //         fetchBets(); // Re-fetch bets after updating
  //       } else {
  //         alert("Failed to update bet");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("An error occurred while updating the bet", error);
  //       alert("An error occurred while updating the bet");
  //     });
  // };

  // Delete a bet
  const deleteBet = (id) => {
    console.log("Deleting bet with ID:", id); // Debugging line

    
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
        toast.dismiss();
        toast.success(response.message);
        setOnChange(!onChange);
        navigate("/");
      } else if (response.error) {
        toast.dismiss();
        toast.error(response.error);
      } else {
        toast.dismiss();
        toast.error("Failed to delete");
      }
    })

  };
  
  const data = {
    bets,
    setOnChange,
    placeBet,
    // updateBet,
    deleteBet,

    

  };

  return (
  <BetContext.Provider value={data}>
    {children}
  </BetContext.Provider>);
};
