import { TbListSearch } from "react-icons/tb";
import { RiHeartFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import style from './LoggedNavigation.module.css'
import { useState } from "react";


export default function LoggedNavigation(){
    const [selectedOptionNav, setSelectedOptionNav] = useState('recs')
    const optionSelectHandler = (option) => {
        setSelectedOptionNav(option);
    }


    return (
        <div className={style.navigationController}>

        <Link to='/app/profile' className={selectedOptionNav === 'profile' ? style.linkProfileActive : style.linkProfileInactive} onClick={() => optionSelectHandler('profile')}>
            <img src='https://pfpmaker.com/_nuxt/img/profile-2.d5d0ad9.png' style={{width: '40px', marginRight: '3px'}} alt="img"></img>
            Гъргулин
        </Link>
        <Link to='/app/explore' onClick={() => optionSelectHandler('explore')}>
            <TbListSearch className={selectedOptionNav === 'explore' ? style.navButtonActive : style.navButtonInactive}></TbListSearch>
        </Link>
        <Link to='/app/recs' onClick={() => optionSelectHandler('recs')}>
            <RiHeartFill className={selectedOptionNav === 'recs' ? style.navButtonActive : style.navButtonInactive}></RiHeartFill>
        </Link>

    </div>
    )
}