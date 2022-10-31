import style from './DetailedInfoSuggestionUser.module.css';
import { FaPaw } from "react-icons/fa";
import { GiCigarette } from "react-icons/gi";
import { RiMoonClearLine } from "react-icons/ri";
import { useSelector } from 'react-redux';
import { ImArrowDown } from "react-icons/im";
import ImagesCarousel from '../DetailedActiveUserCard/ImagesCarousel';
import VerifiedIcon from '@mui/icons-material/Verified';

export default function DetailedInfoSuggestionUser(props) {
    
    const ActiveUSer = useSelector(state => state.activeUser);

    const passions =props.user.passions ?  props.user.passions.map(pass => {
        if(ActiveUSer.passions.indexOf(pass) !== -1){
            return <span key={pass} className={style.passionItem}>{pass}</span>
        }
        return <span key={pass} className={style.commonPassionItem}>{pass}</span>
    }) : '';

    return (
        <div className={style.frame}>
            <div className={style.detailedInfoContainer}>
                <div className={style.photosContainer}>
                    <ImagesCarousel user={props.user}/>
                </div>
                <div className={style.nameAge}>
                    <span className={style.name}>
                    {props.user.username}
                    </span>
                    <span className={style.age}>{props.user.age}</span>
                    {props.user?.verified[0]? <VerifiedIcon className={style.verifiedIcon}/> : <VerifiedIcon className={style.unVerifiedIcon}/>}
                    <ImArrowDown className={style.firstLookIcon} onClick={props.changeLook}/>
                </div>
                <span className={style.location}>{props.user.location}</span>
                <div className={style.userDescription}>{props.user.description}</div>
                <div className={style.basicInfo}>
                    <span className={style.info}>
                        <RiMoonClearLine />
                        {props.user.zodiacSign}
                    </span>
                    <span className={style.info}>
                        <FaPaw />
                        {props.user.pet}
                    </span>
                    <span className={style.info}>
                        <GiCigarette />
                        {props.user.smoking}
                    </span>
                </div>
                <div className={style.passionContainer}>
                    <h5>Passions</h5>
                    <div className={style.passionList}>
                        {passions}
                    </div>
                </div>
            </div>
        </div>
    )
}