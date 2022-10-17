import youtube from "../../images/socialLogos/youtube.png";
import tiktok from "../../images/socialLogos/tiktok.png";
import instagram from "../../images/socialLogos/instagram.png";
import twitter from "../../images/socialLogos/twitter.png";
import facebook from "../../images/socialLogos/facebook.png";
import styles from "./SocialMediaList.module.css";

export default function SocialMediaList (){
    return (

        <section className={styles.socialSection}>
            <h3 className={styles.socialLabel}>SOCIAL</h3>
            <ul className={styles.socialUl}>
                <li><a target="_blank" rel="noreferrer" href="https://www.instagram.com/tinder/"><img src={instagram} alt="socialLogo"></img></a></li>
                <li><a target="_blank" rel="noreferrer" href="https://www.tiktok.com/@tinder"><img src={tiktok} alt="socialLogo"></img></a></li>
                <li><a target="_blank" rel="noreferrer" href="https://www.youtube.com/Tinder"><img src={youtube} alt="socialLogo"></img></a></li>
                <li><a target="_blank" rel="noreferrer" href="https://twitter.com/Tinder"><img src={twitter} alt="socialLogo"></img></a></li>
                <li><a target="_blank" rel="noreferrer" href="https://www.facebook.com/tinder"><img src={facebook} alt="socialLogo"></img></a></li>
            </ul>
        </section>

    )

}