import style from './DetailedInfoSuggestionUser.module.css'
import { FaPaw } from "react-icons/fa";
import { GiCigarette } from "react-icons/gi";
import { RiMoonClearLine } from "react-icons/ri";
import { useSelector } from 'react-redux';

export default function DetailedInfoSuggestionUser() {
    

    return (
        // same parameters as 1st look
        <div className={style.frame}>
            <div className={style.detailedInfoContainer}>
                <div className={style.photosContainer}>
                    
                </div>
                <div className={style.nameAge}>
                    <span className={style.name}>
                        Martina
                    </span>
                    <span className={style.age}>19</span>
                </div>
                <span className={style.location}>Sofiq</span>
                <div className={style.userDescription}>На китарата Васко Жабата, той ще свири, драги гости само за вас. /х2 Чуете мелодии, хора, народни песни, цигански кючеци, всичките са лесни. /х2</div>
                <div className={style.basicInfo}>
                    <span className={style.info}>
                        <RiMoonClearLine />
                        Жаба
                    </span>
                    <span className={style.info}>
                        <FaPaw />
                        Кестен
                    </span>
                    <span className={style.info}>
                        <GiCigarette />
                        Мара
                    </span>
                </div>
                <div className={style.passionContainer}>
                    <h5>Passions</h5>
                    <div className={style.passionList}>
                        <span className={style.passionItem}>koali</span>
                        <span className={style.passionItem}>korali</span>
                        <span className={style.passionItem}>kokali</span>
                        <span className={style.passionItem}>kolani</span>
                        <span className={style.passionItem}>kurami</span>
                        <span className={style.passionItem}>kapani</span>
                    </div>
                </div>
            </div>
        </div>

    )
}