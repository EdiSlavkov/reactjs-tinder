import { TbListSearch } from "react-icons/tb";
import { RiHeartFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import style from './LoggedNavigation.module.css'


export default function LoggedNavigation(){
    return (
        <div className={style.navigationController}>

        <Link to='/app/profile' className={style.linkProfile}>
            <img src='https://pfpmaker.com/_nuxt/img/profile-2.d5d0ad9.png'style={{width: '40px', marginRight: '3px'}} alt="img"></img>
            Гъргулин
        </Link>
        <Link to='/app/explore' className={style.linkBTN}>
            <TbListSearch className={style.navButton}></TbListSearch>
        </Link>
        <Link to='/app/recs' className={style.linkBTN}>
            <RiHeartFill className={style.navButton}></RiHeartFill>
        </Link>

    </div>
    )
}