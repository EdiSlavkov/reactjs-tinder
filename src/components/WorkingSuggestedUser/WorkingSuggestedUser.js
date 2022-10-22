import style from './WorkingSuggestedUser.module.css'
import { LikeStamp, NopeStamp, SuperLikeStamp } from '../Stamps/Stamps'
import { RiMoonClearLine } from "react-icons/ri";
import { FaPaw } from "react-icons/fa";
import { GiCigarette } from "react-icons/gi";
import { BsInfoCircleFill } from "react-icons/bs";






export default function WorkingSuggestedUser(props) {




    return (
        <div className={style.suggestedUserContainer}>
            <div className={style.nameAge}>
                <span className={style.name}>
                    Martina
                </span>
                <span className={style.age}>19</span>
            </div>
            <div className={style.basicInfo}>
                <span className={style.info}>
                    <RiMoonClearLine className={style.info}/>
                    Жаба
                </span>
                <span className={style.info}>
                    <FaPaw className={style.info}/>
                    Кестен
                </span>
                <span className={style.info}>
                    <GiCigarette className={style.info}/>
                    Мара
                </span>
                {/* on click next view */}
                <span className={style.detailedInfo}><BsInfoCircleFill/></span>
            </div>
            {props.dislike ? <NopeStamp/> : null}
            {props.like ? <LikeStamp /> : null}
            {props.superLike ? <SuperLikeStamp /> : null}
        </div>
    )
}