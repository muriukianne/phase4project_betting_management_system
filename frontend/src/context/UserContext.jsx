import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify"

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

  const navigate = useNavigate();
  const [authToken, setAuthToken] = useState(() => sessionStorage.getItem("token"));
  const [currentUser, setCurrentUser] = useState(null);

//   // LOGIN function
const login = (email, password) => {
    toast.loading("Logging you in ... ");
    fetch("https://phase4project-betting-management-system.onrender.com/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((resp) => resp.json())
      .then((response) => {
        if (response.access_token) {
          toast.dismiss();
          sessionStorage.setItem("token", response.access_token);
          setAuthToken(response.access_token);
  
      fetch("https://phase4project-betting-management-system.onrender.com/current_user", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${response.access_token}`,
        },
      })
      .then((response) => response.json())
      .then((response) => {
        if(response.email){
                setCurrentUser(response)
              }
      });
  
      toast.success("Successfully Logged in");
      navigate("/");
    } else if (response.error) {
      toast.dismiss();
      toast.error(response.error);
    } else {
      toast.dismiss();
      toast.error("Failed to login");
    }
  });
  };

  // LOGOUT function
  const logout = () => {
    fetch("https://phase4project-betting-management-system.onrender.com/logout", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          sessionStorage.removeItem("token");
          setAuthToken(null);
          setCurrentUser(null);
          navigate("/login");
        } 
        else {
          alert("Logout failed");
        }
      })
      .catch(() => alert("An error occurred while logging out"));
  };


// Fetch current user
// Initialize current user if token is available
useEffect(() => {
if (authToken) {
    fetchCurrentUser();
}
}, [authToken]);

const fetchCurrentUser = () => 
    {


    fetch('https://phase4project-betting-management-system.onrender.com/current_user',{
        method:"GET",
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${authToken}`
        }
    })
    .then((response) => response.json())
    .then((response) => {
    if(response.email){
    setCurrentUser(response)
    }
    });
};

  // CREATE User (sign up)
  const addUser = (username, email, password) => {
    fetch("https://phase4project-betting-management-system.onrender.com/users/add_user", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    })
    .then((resp)=>resp.json())
    .then((response)=>{
        console.log(response);
        
        if(response.success){
            toast.dismiss()
            toast.success(response.success)
            navigate("/login")
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

  // UPDATE User (change username, email, password)
  const updateUser = (userId, updatedData) => {
    fetch(`https://phase4project-betting-management-system.onrender.com/users/update_user/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(updatedData),
    })
      .then((resp) => resp.json())
      .then((response) => {
        if (response.success) {
          fetchCurrentUser(authToken); // Refresh user data
          alert("User updated successfully");
        } else {
          alert(response.error || "Failed to update user");
        }
      })
      .catch(() => alert("An error occurred while updating user"));
  };

  // DELETE User
  const deleteUser = (userId) => {
    fetch(`https://phase4project-betting-management-system.onrender.com/users/delete_user/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((resp) => resp.json())
      .then((response) => {
        if (response.success) {
          setAuthToken(null);
          setCurrentUser(null);
          navigate("/login");
          alert("User deleted successfully");
        } else {
          alert(response.error || "Failed to delete user");
        }
      })
      .catch(() => alert("An error occurred while deleting user"));
  };



  // Context data to be provided
  const data = {
    authToken,
    currentUser,
    login,
    logout,
    addUser,
    updateUser,
    deleteUser,
  };

  return (
  <UserContext.Provider value={data}>
    {children}
  </UserContext.Provider>);
};
