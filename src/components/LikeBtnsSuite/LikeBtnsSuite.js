import style from './LikeBtnsSuite.module.css'
import { AiFillStar, AiFillHeart } from "react-icons/ai";
import { ImCross } from "react-icons/im";


export default function LikeBtnsSuite(props){
    return(
        <div className={style.suiteContainer}>
            <span className={style.crossBtn} onClick={props.dislike}><ImCross/></span>
            <span className={style.starBtn} onClick={props.superLike}><AiFillStar/></span>
            <span className={style.hearthBtn} onClick={props.like}><AiFillHeart/></span>
        </div>
    )
}