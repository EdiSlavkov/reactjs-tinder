import style from './WorkingSuggestedUser.module.css'
import { LikeStamp, NopeStamp, SuperLikeStamp } from '../Stamps/Stamps'
import { RiMoonClearLine } from "react-icons/ri";
import { FaPaw } from "react-icons/fa";
import { GiCigarette } from "react-icons/gi";
import { BsInfoCircleFill } from "react-icons/bs";






export default function WorkingSuggestedUser(props) {

    


    return (
        <div className={style.suggestedUserContainer} style={{backgroundImage: `url(${props.user.pictures[0].img})`}}>
            <div className={style.nameAge}>
                <span className={style.name}>
                    {props.user.username}
                </span>
                <span className={style.age}>{props.user.age}</span>
            </div>
            <div className={style.basicInfo}>
                <span className={style.info}>
                    <RiMoonClearLine className={style.info}/>
                    {props.user.zodiacSign}
                </span>
                <span className={style.info}>
                    <FaPaw className={style.info}/>
                    {props.user.pet}
                </span>
                <span className={style.info}>
                    <GiCigarette className={style.info}/>
                    {props.user.smoking}
                </span>
            </div>
            {props.dislike ? <NopeStamp/> : null}
            {props.like ? <LikeStamp /> : null}
            {props.superLike ? <SuperLikeStamp /> : null}
        </div>
    )
}