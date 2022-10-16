import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Matches from "./components/SugestionsDashboard/SuggestionsDashboard";
import React, { useState, useEffect } from "react";
import Loader from "./components/Loader/Loader";

function App() {

	const [loader,setLoader] = useState(false);

	useEffect(()=>{
		setTimeout(() => {
			setLoader(true)
		}, 1000);
	},[loader])

	return (
			loader ? <Routes>
			<Route path="/" element={<LandingPage></LandingPage>}></Route>
			<Route path='/app' element={<Outlet></Outlet>}>
				<Route index element={<Navigate to='recs'></Navigate>}></Route>
				<Route path='recs' element= {<Matches></Matches>}></Route>
				<Route path='explore' element= {<div>explore</div>}></Route>
				<Route path='profile' element= {<div>profile</div>}></Route>
			</Route>
		</Routes> : <Loader/>
			
	);
}

export default App;
