import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./FormContainer.module.css";
import logo from "../../images/tinder-logo.svg";
import CloseButton from "react-bootstrap/CloseButton";
import Modal from "react-bootstrap/Modal";

export default function FormContainer(props) {

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordErr, setConfirmPasswordErr] = useState("");

  const [successMsg, setSuccessMsg] = useState("");

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

  const handleSubmit = (e)=>{

    e.preventDefault();

    if(email !== ""){
      const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if(email.match(emailFormat)){
        setEmailError("");
        /* да се сложи допълнителна проверка за съществуваш потребител с такъв мейл и такава парола!
        if(email === database.email){
          setEmailError("");
          if(password === database.password){
            setSuccessMsg("You are successfully logged in!");
          } else {
            setPasswordError("Wrong credentials!")
          }
        } else {
          setEmailError("Wrong credentials!");
        }
        */
       if(confirmPassword === password){
        setConfirmPasswordErr("");
        // да се сложи допълнителна проверка за вече регистриран потребител с такъв мейл!
       } else {
        setConfirmPasswordErr("Passowrds does not match!")
       }
      } else {
        setEmailError("Only e-mail is accepted!")
      }
    } else{
      setEmailError("Email is required!")
    }

    if(password === ""){
      setPasswordError("Password is required!")
    } 

  }

  if (!props.show) return <></>;

  const handleClose = () => props.setShow(false);

  return (
    <Modal show={props.handleAction} onHide={handleClose} animation={false}>
      <div className={styles.form}>
        {successMsg && <div>{successMsg}</div>}
        <Form onSubmit={handleSubmit}>
          <CloseButton onClick={handleClose} className={styles.closeBtn} />
          <img className={styles.logo} src={logo} alt="logo"></img>
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
