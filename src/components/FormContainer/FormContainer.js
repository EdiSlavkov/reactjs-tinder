import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./FormContainer.module.css";
import logo from "../../images/tinder-logo.svg";
import CloseButton from "react-bootstrap/CloseButton";
import Modal from "react-bootstrap/Modal";

export default function FormContainer(props) {

  if (!props.show) return <></>;

  const handleClose = () => props.setShow(false);

  return (
    <Modal show={props.handleAction} onHide={handleClose} animation={false}>
      <div className={styles.form}>
        <Form>
          <CloseButton onClick={handleClose} className={styles.closeBtn} />
          <img className={styles.logo} src={logo} alt="logo"></img>
          <Form.Group className="mb-3" controlId="Email">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="Password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          {props.passConfirm ? (
            <Form.Group className="mb-3" controlId="ConfirmPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Confirm Password" />
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
