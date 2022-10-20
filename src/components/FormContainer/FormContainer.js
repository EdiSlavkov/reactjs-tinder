import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./FormContainer.module.css";
import logo from "../../images/tinder-logo.svg";
import CloseButton from "react-bootstrap/CloseButton";
import Modal from "react-bootstrap/Modal";
import * as utils from "../../utils";
import * as server from "../../server/server";
import { useNavigate  } from "react-router-dom";

export default function FormContainer(props) {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordErr, setConfirmPasswordErr] = useState("");

  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (e)=>{
    setEmailError("");
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e)=>{
    setPasswordError("");
    setPassword(e.target.value);
  }

  const handleConfPassChange = (e)=>{
    setConfirmPasswordErr("");
    setConfirmPassword(e.target.value);
  }

  const handleLogin = (e) =>{
    e.preventDefault();
    server.login(email, password) ? 
    navigate("/app"):
    setMsg("Wrong Credentials!");
    
    setTimeout(() => {
      setMsg("")
    }, 3000);
  }

  const handleRegistration = (e)=>{

    e.preventDefault();

    utils.validateEmail(email) === true ? 
    utils.validatePassword(password) === true ?
    utils.confirmPasswords(password, confirmPassword) === true ?
    server.createAccount(email,password) ?
    setMsg("Registration was successfull! You can log now!") :
    setError("Email is already taken!") :
    setConfirmPasswordErr(utils.confirmPasswords(password, confirmPassword)) :
    setPasswordError(utils.validatePassword(password)) :
    setEmailError(utils.validateEmail(email))
    
    setTimeout(() => {
      setEmailError("")
      setPasswordError("")
      setConfirmPasswordErr("")
      setError("")
      setMsg("")
    }, 3000);
  }

  if (!props.show) return <></>;

  const handleClose = () => props.setShow(false);

  return (
    <Modal show={props.handleAction} onHide={handleClose} animation={false}>
      <div className={styles.form}>
        {props.buttonName === "Login" ? <h3>Lets get started</h3> : <h3>Create account</h3>}
        {(msg && <div className={styles.success}>{msg}</div>) || (error && <div className={styles.generalError}>{error}</div>)}
        <Form onSubmit={props.buttonName === "Login" ? handleLogin : handleRegistration}>
          <CloseButton onClick={handleClose} className={styles.closeBtn} />
          <img className={styles.logo} src={logo} alt="logo" draggable={false}></img>
          <Form.Group className="mb-3" controlId="Email">
            <Form.Label>Email address</Form.Label>
            <Form.Control value={email} type="email" onChange={handleEmailChange} placeholder="Enter email" />
            {emailError&&<span className={styles.error}>{emailError}</span>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="Password">
            <Form.Label>Password</Form.Label>
            <Form.Control value={password} type="password" onChange={handlePasswordChange} placeholder="Password" />
            {passwordError&&<span className={styles.error}>{passwordError}</span>}
          </Form.Group>
          {props.passConfirm ? (
            <Form.Group className="mb-3" controlId="ConfirmPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control value={confirmPassword} onChange={handleConfPassChange} type="password" placeholder="Confirm Password" />
              {confirmPasswordErr&&<span className={styles.error}>{confirmPasswordErr}</span>}
            </Form.Group>
          ) : (
            <></>
          )}
          <div className="d-grid gap-2">
            <Button variant="danger" size="lg" type="submit">
              {props.buttonName}
            </Button>
            {props.passConfirm ? (
              <span>Already registered? <span className={styles.link} onClick={() => {props.goToLog();}}>Go to Login!</span></span>
            ) : (
              <span>Don't have an account? <span className={styles.link} onClick={() => {props.goToReg();}}>Register here!</span></span>
            )}
          </div>
        </Form>
      </div>
    </Modal>
  );
}
