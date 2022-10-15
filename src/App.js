import Login from './components/Login/Login.js';
import React, { useState } from "react";
import "./App.css"
import NavBar from './components/NavBar';

function App() {

  const [showLogin, setShowLogin] = useState(false);
  const [showReg, setShowReg] = useState(false);

  const handleReg = () => setShowReg(true);

  const handleLogin = () => setShowLogin(true);

  return (
    <>
      <NavBar handleLogin={handleLogin}/>
      <Login handleAction={handleLogin} show={showLogin}
       setShow={setShowLogin} passConfirm={false} buttonName="Login"
       goToReg={handleLogin}/>
      <Login handleReg={handleReg} show={showReg} setShow={setShowReg} passConfirm={true} buttonName="Register"/>
    </>
  );

}

export default App;
