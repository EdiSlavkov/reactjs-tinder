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

export default function FormContainer(props) {

  const dispatch = useDispatch();
  const promise = Promise.resolve();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordErr, setConfirmPasswordErr] = useState("");

  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

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
    server.login(email, password)
      ? (()=>{dispatch(update(server.getLoggedUser()))
        navigate("/app/profile")})()
      : setMsg("Wrong Credentials!");
    setEmail("");
    setPassword("");
    setTimeout(() => {
      setMsg("");
    }, 3000);
  };

  const handleRegBtn = (e) =>{
    let btn = document.getElementById("regBtn");
    e.stopPropagation();
    utils.validateEmail(email) === true
      ? utils.validatePassword(password) === true
        ? utils.confirmPasswords(password, confirmPassword) === true
          ?  btn.disabled = false

          : btn.disabled = true
        : btn.disabled = true
      : btn.disabled = true

  }

  const handleRegistration = (e) => {
    e.preventDefault();

    server.createAccount(email, password)
            ? (()=>{
              setMsg("Successfull! Redirecting to login!");
              (setTimeout(() => {
              props.setShow(false)
            props.showLogin()
            setMsg("");
            }, 3000))
            })()
    
            : (()=>{
              setError("Email is already taken!");
            setTimeout(() => {
              setError("");
            }, 3000)
            })()

    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

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
          onBlur={props.buttonName === "Register" ? ()=>
          promise
          .then(setPasswordError(utils.validatePassword(password)))
          .then(setConfirmPasswordErr(utils.confirmPasswords(confirmPassword, password)))
          .then(setEmailError(utils.validateEmail(email)))
          : null}
          onKeyUp={props.buttonName === "Register" ? handleRegBtn : null}
        >
          <CloseButton onClick={handleClose} className={styles.closeBtn} />
          <img
            className={styles.logo}
            src={logo}
            alt="logo"
            draggable={false}
          ></img>
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
              disabled={props.buttonName === "Register" ? true : false}
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
        </Form>
      </div>
    </Modal>
  );
}
