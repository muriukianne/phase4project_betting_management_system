import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout"
import Home from "./pages/Home";
import Login from "./pages/Login";
import PlaceBet from "./pages/PlaceBet";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import NoPage from "./pages/NoPage"
import About from "./pages/About";
import SingleBet from './pages/SingleBet';
import { UserProvider } from "./context/UserContext";
import { BetProvider } from "./context/BetContext";

function App() {
 

  return (
    <BrowserRouter>
        
      <UserProvider>
        <BetProvider>
          
          <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/about" element={<About />} />
                <Route path="/placebet" element={<PlaceBet />} />
                <Route path="/bet/:id" element={<SingleBet />} />
                <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>

       
        </BetProvider>
      </UserProvider>

    </BrowserRouter>

  )
}

export default App
