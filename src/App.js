import { Route, Routes, Outlet, Navigate, useNavigate } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import { Matches, Explore } from "./components/SuggestionsDashboard/SuggestionsDashboard";
import React, { useState, useEffect } from "react";
import Loader from "./components/Loader/Loader";
import NewUserInfo from "./components/NewUserInfo/NewUserInfo";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import { isLogged } from "./server/server";

function App() {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

	useEffect(()=>{
		setTimeout(() => {
			setLoader(true)
		}, 1000);
		isLogged() ? navigate("/app/profile")
	: navigate("/");
	},[loader])

	return (
			loader ? <Routes>
			<Route path="/" element={<LandingPage/>}></Route>
			<Route path='/app' element={<Outlet></Outlet>}>
				<Route index element={<Navigate to='profile'></Navigate>}></Route>
				<Route path='recs' element= {<Matches></Matches>}></Route>
				<Route path='explore' element= { <Explore></Explore>}></Route>
				<Route path='profile' element= {<ProfilePage></ProfilePage>}></Route>
				{/* <Route path="/details" element={}></Route> */}
				<Route path='user' element={<NewUserInfo></NewUserInfo>}></Route>
			</Route>
		</Routes> : <Loader/>
			
	);
}

export default App;
