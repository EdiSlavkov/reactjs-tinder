import Navbar from 'react-bootstrap/Navbar';
import navLogo from "../../images/tinder_logo_white.png";
import styles from "./NavBar.module.css";
import Button from 'react-bootstrap/Button';

export default function NavBar(props) {

  return (
     <Navbar className={styles.navBar} collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand><img className={styles.navLogo} src={navLogo}></img></Navbar.Brand>
          <Button onClick={props.handleLogin} className={styles.logBtn} size="lg" variant="light">Log in</Button>
    </Navbar>
  );
}