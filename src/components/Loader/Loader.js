import loadingImg from "../../images/Loader.png";
import logo from "../../images/tinder-logo-transparant.png";
import styles from "./Loader.module.css";
export  default function Loader(){

    return(
        <>
            <img className={styles.loaderBackground} src={logo} alt="loadingImg"></img>
            <img src={loadingImg} className={styles.loaderLogo} alt="loadingImg"></img>
        </>
        
    )
}