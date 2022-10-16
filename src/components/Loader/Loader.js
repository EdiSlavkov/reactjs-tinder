import loadingImg from "../../images/Loader.png"
import logo from "../../images/tinder-logo-transparant.png"
export  default function Loader(){

    return(
        <>
            <img src={logo} style={{ width: '75px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} alt="loadingImg"></img>
            <img src={loadingImg} style={{ width: '100vw' , height: '100vh'}} alt="loadingImg"></img>
        </>
        
    )
}