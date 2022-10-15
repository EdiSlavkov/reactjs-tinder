import FormContainer from "../FormContainer/FormContainer";
import styles from "./LandingPage.module.css";
import Button from 'react-bootstrap/Button';
import React, { useState } from "react";
import  Navbar  from "../NavBar/NavBar";





export default function LandingPage(){
    const [showLogin, setShowLogin] = useState(false);
	const [showReg, setShowReg] = useState(false);

	const handleReg = () => {
		setShowLogin(false);
		setShowReg(true);
	};
	const handleLogin = () => {
		setShowReg(false);
		setShowLogin(true);
	};
    return (
        <>
			<Navbar handleLogin={handleLogin} />
			<section className={styles.mainContainer}>
				<FormContainer
					handleAction={handleLogin}
					show={showLogin}
					setShow={setShowLogin}
					passConfirm={false}
					buttonName="Login"
					goToReg={handleReg}
				/>
				<FormContainer
					handleAction={handleReg}
					show={showReg}
					setShow={setShowReg}
					passConfirm={true}
					buttonName="Register"
					goToLog={handleLogin}
				/>
				<div className={styles.sloganContainer}>
					<h1 className={styles.slogan}>Swipe Right®</h1>
					<Button variant="danger" size="lg" className={styles.createAcc} onClick={handleReg}>Create account</Button>
				</div>
			</section>
		</>
    )
}
