import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./FormContainer.module.css";
import logo from "../../images/tinder-logo.svg";
import CloseButton from "react-bootstrap/CloseButton";
import Modal from "react-bootstrap/Modal";
import * as utils from "../../utils";
import * as server from "../../server/server";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux/es/exports";
import { update } from "../../store/ActiveUserSlice";
import { setChatBuddy } from "../../store/ChatBuddySlice";

export default function FormContainer(props) {

  const [disable, setDisable] = useState(true);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordErr, setConfirmPasswordErr] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const clear = ()=>{
    setEmail("");
    setEmailError("");
    setPassword("");
    setPasswordError("");
    setConfirmPassword("");
    setConfirmPasswordErr("");
    setMsg("");
    setError("");
  }

  const handleEmailChange = (e) => {
    setEmailError("");
    setEmail(e.target.value);
    props.buttonName === "Register" &&
      setEmailError(utils.validateEmail(e.target.value));
  };

  const handlePasswordChange = (e) => {
    utils.confirmPasswords(e.target.value, confirmPassword)&&setConfirmPasswordErr("");

    setPasswordError("");
    setPassword(e.target.value);
    props.buttonName === "Register" &&
      setPasswordError(utils.validatePassword(e.target.value));
  };

  const handleConfPassChange = (e) => {
    e.stopPropagation();
    setConfirmPasswordErr("");
    setConfirmPassword(e.target.value);
    setConfirmPasswordErr(utils.confirmPasswords(e.target.value, password));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if(server.login(email, password)){
      setMsg("Success! Redirecting...")
      setLoader(true);
      setTimeout(() => {
        setMsg("");
        setLoader(false);
        dispatch(setChatBuddy(server.findBudy(server.getLoggedUser().chats[0]?.chatBuddy??{})))
        dispatch(update(server.getLoggedUser()));
      navigate("/app/profile");
      }, 2500);
      
    } else {
      setMsg("Wrong Credentials!");
       setEmail("");
    setPassword("");
    setTimeout(() => {
      setMsg("");
    }, 3000);
  };
  }
   

  const handleRegBtn = () =>{

    if(utils.validateEmail(email) === true &&
    utils.validatePassword(password) === true &&
    utils.confirmPasswords(password, confirmPassword) === true
    ){
      setDisable(false)
    } else {
      setDisable(true)
    }
  }

  const handleRegistration = (e) => {
    e.preventDefault();

    if(server.createAccount(email, password)){
      setMsg("Successfull! Redirecting to login...");
      setLoader(true);
      setTimeout(() => {
        setDisable(true);
      setLoader(false);
      props.setShow(false)
      props.showLogin()
      clear();
    setMsg("");
    }, 2500)
    } else {
      setError("Email is already taken!");
      setTimeout(() => {
        setError("");
      }, 3000)
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    }
    
    
  };

  if (!props.show) return <></>;

  const handleClose = () => props.setShow(false);

  return (
    <Modal show={props.handleAction} onHide={handleClose} animation={false}>
      <div className={styles.form}>
        {props.buttonName === "Login" ? (
          <h3>Lets get started</h3>
        ) : (
          <h3>Create account</h3>
        )}
        {(msg && <div className={styles.success}>{msg}</div>) ||
          (error && <div className={styles.generalError}>{error}</div>)}
        <Form
          onSubmit={
            props.buttonName === "Login" ? handleLogin : handleRegistration
          }
          onKeyUp={props.buttonName === "Register" ? (e)=>{
            handleRegBtn();
            setPasswordError(utils.validatePassword(password));
            setConfirmPasswordErr(utils.confirmPasswords(confirmPassword, password));
            setEmailError(utils.validateEmail(email));
            handleRegBtn();
          } : null}
        >
          <CloseButton onClick={handleClose} className={styles.closeBtn} />
          <img
            className={styles.logo}
            src={logo}
            alt="logo"
            draggable={false}
          ></img>
          {loader ?
           <div className={styles.loaderWrapper}>
            <div className={styles.loader}>
            <div className="spinner-border text-danger"  role="status">
            </div>
            </div>
            <div className={props.buttonName === "Login" ? styles.btnLoader : styles.btnLoaderReg}>
            <div className="d-grid gap-2">
                        <Button
                        id="regBtn"
                        className={
                          props.buttonName === "Register" ? styles.registerBtn : ""
                        }
                        disabled={props.buttonName === "Register"&&disable ? true : false || loader ? true : false}
                        variant="danger"
                        size="lg"
                        type="submit"
                      >
                        {props.buttonName}
                      </Button>
            </div>
            </div>
           </div>
         : <>
            <Form.Group className="mb-3" controlId="Email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              value={email}
              type="email"
              onChange={handleEmailChange}
              placeholder="Enter email"
            />
            {emailError && (
              <span className={styles.emailError}>{emailError}</span>
            )}
          </Form.Group>
          <div className={styles.passWrapper}>
            <Form.Group className="mb-3 passWrapper" controlId="Password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={password}
                type="password"
                onChange={handlePasswordChange}
                onClick={props.buttonName === "Register" ? handlePasswordChange : null}
                onBlur={()=>setPasswordError("")}
                placeholder="Password"
              />
              {passwordError && (
                <span className={styles.error}>{passwordError}</span>
              )}
            </Form.Group>
          </div>
          {props.passConfirm ? (
            <div className={styles.passConfirmWrapper}>
              <Form.Group className="mb-3" controlId="ConfirmPassword">
                <Form.Label>Confirm password</Form.Label>
                <Form.Control
                  value={confirmPassword}
                  onChange={handleConfPassChange}
                  onClick={(e)=>setConfirmPasswordErr(utils.confirmPasswords(e.target.value, password))}
                  type="password"
                  placeholder="Confirm Password"
                />
                {confirmPasswordErr && (
                  <span className={styles.passConfirmError}>
                    {confirmPasswordErr}
                  </span>
                )}
              </Form.Group>
            </div>
          ) : (
            <></>
          )}
          <div className="d-grid gap-2">
            <Button
              id="regBtn"
              className={
                props.buttonName === "Register" ? styles.registerBtn : ""
              }
              disabled={props.buttonName === "Register"&&disable ? true : false}
              variant="danger"
              size="lg"
              type="submit"
            >
              {props.buttonName}
            </Button>
            {props.passConfirm ? (
              <span>
                Already registered?{" "}
                <span
                  className={styles.link}
                  onClick={() => {
                    clear();
                    props.goToLog();
                  }}
                >
                  Go to Login!
                </span>
              </span>
            ) : (
              <span>
                Don't have an account?{" "}
                <span
                  className={styles.link}
                  onClick={() => {
                    clear();
                    props.goToReg();
                  }}
                >
                  Register here!
                </span>
              </span>
            )}
          </div>
          </>}
        </Form>
      </div>
    </Modal>
  );
}
